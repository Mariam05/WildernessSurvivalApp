import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Patient, Vital, Reading} from "../schemas";
import { useAuth } from "./AuthProvider";
//import defaultVitals from "../app/assets/defaultVitals";

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
			schema: [Patient.schema, Vital.schema, Reading.schema],
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

	const refreshRealm = () => {
		closeRealm();
		if (user == null) {
			console.error("Null user? Needs to log in!");
			return;
		}

		const config: Realm.Configuration = {
			schema: [Patient.schema],
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
	};

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


			const temperatureVital = new Vital({
				periodicity: 60,
				name: "Heat Check",
				type: "Numerical",
				description: "Temp Desc",
				data: [new Reading({
					timestamp: "1640705088",
					value: 42,
					url: ""
				}),
				new Reading({
					timestamp: "1640708857",
					value: 145,
				}),
				new Reading({
					timestamp: "1640712857",
					value: 21,
				})],
				categories: [],
				timeElapsed: 10,
			})

			const generalVital = new Vital({
				periodicity: 60,
				name: "General",
				type: "Special",
				description: "General notes",
				data: [new Reading({
					timestamp: "1640705088",
					value: "Patient has exhibited signs of hypothermia.",
				}),
				new Reading({
					timestamp: "1640708857",
					value: "Patient has fainted.",
				}),
				new Reading({
					timestamp: "1640712857",
					value: "Someone get help",
				})],
			})

			const photosVital = new Vital({
				periodicity: 60,
				name: "Photos",
				type: "Special",
				description: "Photo notes",
				data: [new Reading({
					timestamp: "1640705088",
					value: "Patient eyes",
					url: "https://georgiaeyephysicians.com/wp-content/uploads/2013/10/Treating-Your-Eye-Condition-with-Specialized-Surgery-300x238.jpg",
				})
				],
			})


		} catch (error) {
			console.log("failed to make vitals ");
		}
		const defaultVitals = [];

		try {
			realm.write(() => {
				// Create a new patient in the same partition -- that is, using the same user id.
				try {
					realm.create(
						"Patient", new Patient({
							image: image || 0,
							name: name || "New Patient",
							age: age || "?",
							sex: sex || "Other",
							partition: user.id,
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
				refreshRealm,
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
