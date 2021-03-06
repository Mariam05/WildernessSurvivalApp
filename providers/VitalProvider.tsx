import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Patient, Vital, Reading } from "../schemas";
import { useAuth } from "./AuthProvider";
import { ObjectId } from "bson";
import Moment from "moment";

const VitalsContext = React.createContext(null);

const VitalsProvider = ({ children, patientId }) => {
	const [patient, setPatient] = useState<Realm.Object>();
	const { user } = useAuth();

	// Use a Ref to store the realm rather than the state because it is not
	// directly rendered, so updating it should not trigger a re-render as using
	// state would.
	const realmRef = useRef(null);

	useEffect(() => {
		console.log("use effect in Vital provider");
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

		// open a realm for this particular project and get all Vitals
		try {
			Realm.open(config).then((realm) => {
				realmRef.current = realm;

				/*
                realm.write(() => {
                    realm.deleteAll();
                    console.log("deleting all vitals");
                });*/

				const patientDoc = realm.objectForPrimaryKey(
					"Patient",
					new ObjectId(patientId)
				);
				setPatient(patientDoc);

				// we observe changes on the Vitals, in case Sync informs us of changes
				// started in other devices (or the cloud)
				patientDoc.addListener(() => {
					console.log("Got new vitals!");
					setPatient(patientDoc);
				});
			});
		} catch (error) {
			console.log(error.message);
			console.log("Error opening realm:");
		}

		return () => {
			// cleanup function
			closeRealm();
		};
	}, [patientId]);

	const createVital = (
		patientId: ObjectId,
		name: string,
		periodicity: number,
		type: string,
		description: string,
		categories: Array<string>
	) => {
		const realm = realmRef.current;
		periodicity = periodicity && periodicity >= 0 ? periodicity : 60;
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
				: "New Vital";
		type = type ? type : "Numerical";
		description = description ? description : "";
		categories = categories ? categories : [];

		const vital = new Vital({
			periodicity: 60,
			name: name || "New Vital",
			type: type || "Numerical",
			description: description || "",
			data: [],
			categories: categories || [],
			timeElapsed: 0,
		});

		try {
			const patientDoc = realm.objectForPrimaryKey("Patient", patientId);
			realm.write(() => {
				patientDoc.vitals.push(vital);
			});
		} catch (error) {
			console.log(error.message);
			console.log(
				"Failed to write vital:\n" +
					name +
					"\n" +
					periodicity +
					"\n" +
					type +
					"\n" +
					description +
					"\n" +
					typeof categories
			);
		}
	};

	// Define the function for updating a vital
	const updateVital = (vital_name: string, reading: Reading) => {
		// console.log("patient to update is: ", patient)
		const realm = realmRef.current;
		const pat = patient as unknown as Patient;

		if (pat == null) console.log("pat is null");
		if (pat != null) {
			try {
				// console.log("patient entries are " + pat.vitals);
				for (let vital of pat.vitals) {
					if (vital.name == vital_name) {
						realm.write(() => {
							vital.data.push(reading);
							pat.timestamp = Date.now(); // update the patients timestamp
						});

						console.log("added new data to vital ", vital);
					}
				}
			} catch (error) {
				console.error(error.message);
				console.error("Failed to update patient with vitals");
			}
			// console.log("patient is now: ", patient)
		}
	};

	const bulkUpdateVitals = (vitals) => {};

	// Define the function for deleting a Vital.
	/*const deleteVital = (vital) => {
        const realm = realmRef.current;
        realm.write(() => {
            realm.delete(vital);
            // after deleting, we get the Vitals again and update them
            setVitals([...realm.objects("Vital").sorted("name")]);
        });
    };*/

	const closeRealm = () => {
		const realm = realmRef.current;
		if (realm) {
			realm.close();
			realmRef.current = null;
			setPatient(null);
		}
	};

	// Render the children within the VitalsContext's provider. The value contains
	// everything that should be made available to descendants that use the
	// useVitals hook.
	return (
		<VitalsContext.Provider
			value={{
				createVital,
				closeRealm,
				updateVital,
				patient,
			}}
		>
			{children}
		</VitalsContext.Provider>
	);
};

// The useVitals hook can be used by any descendant of the VitalsProvider. It
// provides the vitals of the VitalsProvider's project and various functions to
// create, update, and delete the vitals.
const useVitals = () => {
	const vitals = useContext(VitalsContext);
	if (vitals == null) {
		throw new Error("useVitals() called outside of a VitalsProvider?"); // an alert is not placed because this is an error for the developer not the user
	}
	return vitals;
};

export { VitalsProvider, useVitals };
