import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Patient, Vital} from "../schemas";
import { useAuth } from "./AuthProvider";

const PatientsContext = React.createContext(null);

const PatientsProvider = (props) => {
	const [patients, setPatients] = useState([]);
	const { user } = useAuth();

	// Use a Ref to store the realm rather than the state because it is not
	// directly rendered, so updating it should not trigger a re-render as using
	// state would.
	const realmRef = useRef(null);

	useEffect(() => {
		if (user == null) {
			console.error("Null user? Needs to log in!");
			return;
		}

		const config: Realm.Configuration = {
			schema: [Patient.schema, Vital.schema],
			sync: {
				user: user,
				partitionValue: `${user.id}`,
			},
		};

		// open a realm for this particular project and get all Patients
		Realm.open(config).then((realm) => {
			realmRef.current = realm;
			/*realm.write(() => {
				realm.deleteAll();
				console.log("deleting all");
			});*/

			const syncPatients = realm.objects("Patient");
			let sortedPatients = syncPatients.sorted("name");
			setPatients([...sortedPatients]);

			// we observe changes on the Patients, in case Sync informs us of changes
			// started in other devices (or the cloud)
			sortedPatients.addListener(() => {
				console.log("Got new data!");
				setPatients([...sortedPatients]);
			});
		});

		return () => {
			// cleanup function
			closeRealm();
		};
	}, [user]);

	const createPatient = (image: number, name: string, age: string, sex: string) => {
		const realm = realmRef.current;
		image = image && image >= 0 ? image : 0;
		name =
			name && name.length > 1
				? name
					.toLowerCase()
					.split(" ")
					.map((word) =>
						word
							? word.replace(
								word[0],
								word[0].toUpperCase()
							)
							: null
					)
					.join(" ")
				: "New Patient";
		age = age && age.length > 1 ? age : "?";
		sex = sex && sex.length > 1 ? sex : "?";
		try {
			realm.write(() => {
				// Create a new patient in the same partition -- that is, using the same user id.
				try {
					realm.create(
						"Patient",
						new Patient({
							image: image || 0,
							name: name || "New Patient",
							age: age || "?",
							sex: sex || "Other",
							partition: user.id,
							vitals: [],
						})
					);
				} catch (error) {
					console.log(error.message)
					console.log("Failed to create record")
				}
			});
		} catch (error) {
			console.log(error.message)
			console.log("Failed to write:\n" + name + "\n" + age + "\n" + sex + "\n" + image);
		}
	};

    // Define the function for updating a patient
    //const updatePatient = (patient, vitals)

	// Define the function for deleting a Patient.
	const deletePatient = (patient) => {
		const realm = realmRef.current;
		realm.write(() => {
			realm.delete(patient);
			// after deleting, we get the Patients again and update them
			setPatients([...realm.objects("Patient").sorted("name")]);
		});
	};

	const closeRealm = () => {
		const realm = realmRef.current;
		if (realm) {
			realm.close();
			realmRef.current = null;
			setPatients([]);
		}
	};

	// Render the children within the PatientsContext's provider. The value contains
	// everything that should be made available to descendants that use the
	// usePatients hook.
	return (
		<PatientsContext.Provider
			value={{
				createPatient,
				deletePatient,
				closeRealm,
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
