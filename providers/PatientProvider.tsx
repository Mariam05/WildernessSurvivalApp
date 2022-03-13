import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { ObjectId } from "bson";
import { Patient, Vital, Reading } from "../schemas";
import { useAuth } from "./AuthProvider";
import defaultVitals from "../app/assets/defaultVitals";

const PatientsContext = React.createContext(null);

const PatientsProvider = (props) => {
	const [patients, setPatients] = useState<Realm.Object[]>([]);
	const { user } = useAuth();

	// Use a Ref to store the realm rather than the state because it is not
	// directly rendered, so updating it should not trigger a re-render as using
	// state would.
	const realmRef = useRef(null);

	useEffect(() => {
		openPatientRealm();
		return () => {
			// cleanup function
			closePatientRealm();
		};
	}, [user]);

	const openPatientRealm = () => {
		if (user == null) {
			console.error("Null user? Needs to log in!");
			return;
		}

		const config: Realm.Configuration = {
			schema: [Patient.schema, Vital.schema, Reading.schema],
			sync: {
				user: user,
				partitionValue: `${user.id}`,
			},
		};

		// open a realm for this particular project and get all Patients
		Realm.open(config).then((realm) => {
			realmRef.current = realm;

			const syncPatients = realm.objects("Patient");
			let sortedPatients = syncPatients.sorted("timestamp", true);
			setPatients([...sortedPatients]);

			// we observe changes on the Patients, in case Sync informs us of changes
			// started in other devices (or the cloud)
			sortedPatients.addListener(() => {
				console.log("Got new patients!");
				setPatients([...sortedPatients]);
			});
		});
		console.log("Opening Patient Provider Realm!");
	};

	const createPatient = (name: string, age: string, sex: string) => {
		const realm = realmRef.current;
		name =
			name && name.length > 1
				? name
						.toLowerCase()
						.split(" ")
						.map((word) =>
							word
								? word.replace(word[0], word[0].toUpperCase())
								: null
						)
						.join(" ")
				: "New Patient";
		age = age && age.length > 1 ? age : "?";
		sex = sex && sex.length > 1 ? sex : "?";
		let patient = new Patient({
			name: name || "New Patient",
			age: age || "?",
			sex: sex || "Other",
			partition: user.id,
			vitals: defaultVitals,
		});
		try {
			realm.write(() => {
				// Create a new patient in the same partition -- that is, using the same user id.
				try {
					realm.create("Patient", patient);
				} catch (error) {
					console.log(error.message);
					console.log("Failed to create record");
				}
			});
		} catch (error) {
			console.error(error.message);
			console.error(
				"Failed to write:\n" + name + "\n" + age + "\n" + sex
			);
		}
		return patient;
	};

	const updatePatient = (
		id: String,
		name: String,
		age: String,
		sex: String
	) => {
		const realm = realmRef.current;
		name =
			name && name.length > 1
				? name
						.toLowerCase()
						.split(" ")
						.map((word) =>
							word
								? word.replace(word[0], word[0].toUpperCase())
								: null
						)
						.join(" ")
				: "New Patient";
		age = age && age.length > 1 ? age : "?";
		sex = sex && sex.length > 1 ? sex : "?";

		try {
			const patient = realm.objectForPrimaryKey("Patient", id);

			realm.write(() => {
				patient.name = name;
				patient.age = age;
				patient.sex = sex;
				patient.timestamp = Date.now();

				console.log(`Successfully updated the patient.`);
			});
		} catch (error) {
			console.error(error.message);
			console.error(
				"Failed to update:\n" + name + "\n" + age + "\n" + sex
			);
		}
	};

	// Define the function for deleting a Patient.
	const deletePatient = (patient) => {
		const realm = realmRef.current;
		realm.write(() => {
			realm.delete(patient);
			// after deleting, we get the Patients again and update them
			setPatients([...realm.objects("Patient").sorted("name")]);
		});
	};

	const closePatientRealm = () => {
		const realm = realmRef.current;
		if (realm) {
			realm.close();
			realmRef.current = null;
			setPatients([]);
			console.log("Closing Patient Provider Realm!");
		}
	};

	// Render the children within the PatientsContext's provider. The value contains
	// everything that should be made available to descendants that use the
	// usePatients hook.
	return (
		<PatientsContext.Provider
			value={{
				createPatient,
				updatePatient,
				deletePatient,
				openPatientRealm,
				closePatientRealm,
				patients,
			}}
		>
			{props.children}
		</PatientsContext.Provider>
	);
};

// The usePatients hook can be used by any descendant of the PatientsProvider. It
// provides the patients of the PatientsProvider's project and various functions to
// create, update, and delete the patients.
const usePatients = () => {
	const patients = useContext(PatientsContext);
	if (patients == null) {
		throw new Error("usePatients() called outside of a PatientsProvider?"); // an alert is not placed because this is an error for the developer not the user
	}
	return patients;
};

export { PatientsProvider, usePatients };
