import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Vital } from "../schemas";
import { useAuth } from "./AuthProvider";

const VitalsContext = React.createContext(null);

const VitalsProvider = ({ children, partition }) => {
	const [vitals, setVitals] = useState([]);
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
			schema: [Vital.schema],
			sync: {
				user: user,
				partitionValue: `${partition}`,
			},
		};

		// open a realm for this particular project and get all Vitals
		Realm.open(config).then((realm) => {
			realmRef.current = realm;
			/*realm.write(() => {
				realm.deleteAll();
				console.log("deleting all");
			});*/

			const syncVitals = realm.objects("Vital");
			let sortedVitals = syncVitals.sorted("name");
			setVitals([...sortedVitals]);

			// we observe changes on the Vitals, in case Sync informs us of changes
			// started in other devices (or the cloud)
			sortedVitals.addListener(() => {
				console.log("Got new data!");
				setVitals([...sortedVitals]);
			});
		});

		return () => {
			// cleanup function
			closeRealm();
		};
	}, [user]);

    const selectPatient = (patient) => {
        setPatient(patient);
     };

	const createVital = (name: string, periodicity: number, type: string, description: string, categories: list) => {
		const realm = realmRef.current;
		periodicity = periodicity && periodicity >= 0 ? periodicity : 60;
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
				: "New Vital";
		type = type ? type : "Numerical";
		description = description ? description : "";
		categories = categories ? categories : [];
		console.log(partition, periodicity, name, type, description, categories);
		try {
			realm.write(() => {
				// Create a new vital in the same partition -- that is, using the same user id.
				try {
					realm.create(
						"Vital",
						new Vital({
						    partition: `${partition}`,
							periodicity: periodicity || 60,
							name: name || "New Vital",
							type: type || "Numerical",
							description: description || "",
							data: [],
							categories: categories || [],
							timeElapsed: 0,
						})
					);
				} catch (error) {
					console.log(error.message)
					console.log("Failed to create record")
				}
			});
		} catch (error) {
			console.log(error.message)
			console.log("Failed to write vital:\n" + name + "\n" + periodicity + "\n" + type + "\n" + description + "\n" + (typeof categories));
		}
	};

    // Define the function for updating a vital
    const updateVital = (vital, reading) => {

    }

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
			setVitals([]);
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
				vitals,
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
	if (vitals  == null) {
		throw new Error("useVitals() called outside of a VitalsProvider?"); // an alert is not placed because this is an error for the developer not the user
	}
	return vitals;
};

export { VitalsProvider, useVitals };
