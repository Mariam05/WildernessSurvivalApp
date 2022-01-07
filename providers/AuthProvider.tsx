import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../RealmApp";

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(app.currentUser);
	const realmRef = useRef(null);

	useEffect(() => {
		if (!user) {
			console.warn("NO USER Logged In");
			return;
		}

		const config = {
			sync: {
				user,
				partitionValue: `user=${user.id}`,
			},
		};

		// Open a realm with the logged in user's partition value in order
		// to get the links that the logged in user added
		// (instead of all the links stored for all the users)
		Realm.open(config).then((userRealm) => {
			realmRef.current = userRealm;
		});

		return () => {
			// cleanup function
			const userRealm = realmRef.current;
			if (userRealm) {
				userRealm.close();
				realmRef.current = null;
			}
		};
	}, [user]);

	// The signIn function takes an email and password and uses the
	// emailPassword authentication provider to log in.
	// This authentication method should be set up correctly on the MongoDB Realm App
	// see: https://docs.mongodb.com/realm/authentication/providers/
	const signIn = async (email, password) => {
		const creds = Realm.Credentials.emailPassword(
			email.toLowerCase(),
			password
		);
		const newUser = await app.logIn(creds);
		setUser(newUser);
		return newUser;
	};

	// The signUp function takes an email and password and uses the
	// emailPassword authentication provider to register the user.
	// This authentication should be set up correctly on the MongoDB Realm App
	// see: https://docs.mongodb.com/realm/authentication/providers/
	const signUp = async (email, password) => {
		email = email.toLowerCase();
		await app.emailPasswordAuth.registerUser({ email, password });
	};

	// The signOut function calls the logOut function on the currently
	// logged in user
	const signOut = () => {
		if (user == null) {
			console.warn("Not logged in, can't log out!");
			return;
		}
		user.logOut();
		setUser(null);
	};

	/*
	 * Insert custom data for the specified user
	 */
	const insertCustomUserData = (newUser: Realm.User<Realm.DefaultFunctionsFactory, SimpleObject, Realm.DefaultUserProfileData>,
		image: number, firstName: string, lastName: string) => {
		firstName = firstName.toLowerCase().replace(firstName[0], firstName[0].toUpperCase());
		lastName = lastName.toLowerCase().replace(lastName[0], lastName[0].toUpperCase());
		if (newUser) {
			const mongodb = newUser.mongoClient("mongodb-atlas");
			const custom_data_collection = mongodb.db("wilderness").collection("User");
			const customData = {
				"_partition": newUser.id,
				"image": image,
				"firstName": firstName,
				"lastName": lastName,
			}

			custom_data_collection.insertOne(customData)
				.then((result) => console.log(`Successfully inserted custom data with _id: ${result.insertedId}`))
				.catch((err) => console.error(`Failed to insert custom data: ${err}`));
		} else {
			console.log("NULL USER");
		}
	}

	/*
	 * Update the current user's custom data, no user passed because the user must be logged in
   	 */
	const updateCustomUserData = async (newImage: number, newFirstName: string, newLastName: string) => {
		if (user) {
			const mongodb = user.mongoClient("mongodb-atlas");
			const custom_data_collection = mongodb.db("wilderness").collection("User");
			const filter = {
				_partition: user.id,
			};

			const updateData = {
				$set: {
					image: newImage,
					firstName: newFirstName,
					lastName: newLastName,
				}
			}

			await custom_data_collection.updateOne(filter, updateData)
				.then((result) => console.log(`Successfully updated custom data with _id: ${result.upsertedId}`))
				.then(() => user.refreshCustomData())
				.catch((err) => console.error(`Failed to update custom data: ${err}`));
		} else {
			console.log("NULL USER");
		}
	}

	return (
		<AuthContext.Provider
			value={{
				signUp,
				signIn,
				signOut,
				user,
				insertCustomUserData,
				updateCustomUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
	const auth = useContext(AuthContext);
	if (auth == null) {
		throw new Error("useAuth() called outside of a AuthProvider?");
	}
	return auth;
};

export { AuthProvider, useAuth };
