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
			console.error("Null user? Needs to log in!");
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
	const emailSignIn = async (email: string, password: string) => {
		if (user) {
			// if there is a user signed in, sign them out
			console.log("Signing out user before sigining in");
			await signOut();
		}

		const creds = Realm.Credentials.emailPassword(
			email.toLowerCase(),
			password
		);

		const newUser = await app.logIn(creds);
		setUser(newUser);
		return newUser;
	};

	const anonSignIn = async () => {
		const creds = Realm.Credentials.anonymous();

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
	const signOut = async () => {
		if (user == null) {
			console.warn("Not logged in, can't log out!");
			return;
		}
		await user.logOut();
		setUser(null);
	};

	/**
	 * Changes the password of a user.
	 * Assumes the email is checked and is a match with the current user's email.
	 * Assumes that the password entry is validated.
	 */
	const changePassword = async (
		email: string,
		oldPass: string,
		newPass: string
	) => {
		email = email.toLowerCase();
		const oldCreds = Realm.Credentials.emailPassword(email, oldPass);

		await app.logIn(oldCreds);

		await app.emailPasswordAuth.callResetPasswordFunction(
			{
				email: email,
				password: newPass,
			},
			[]
		);
	};

	/*
	 * Insert custom data for the specified user
	 */
	const insertCustomUserData = (
		newUser: Realm.User<
			Realm.DefaultFunctionsFactory,
			SimpleObject,
			Realm.DefaultUserProfileData
		>,
		firstName: string,
		lastName: string
	) => {
		firstName =
			firstName.toUpperCase()[0] + firstName.toLowerCase().slice(1);
		lastName = lastName.toUpperCase()[0] + lastName.toLowerCase().slice(1);
		if (newUser) {
			const mongodb = newUser.mongoClient("mongodb-atlas");
			const custom_data_collection = mongodb
				.db("wilderness")
				.collection("User");
			const customData = {
				_partition: newUser.id,
				image: 0,
				firstName: firstName,
				lastName: lastName,
			};

			custom_data_collection
				.insertOne(customData)
				.then((result) =>
					console.log(
						`Successfully inserted custom data with _id: ${result.insertedId}`
					)
				)
				.then(() => user.refreshCustomData())
				.catch((err) =>
					console.error(
						`Failed to insert custom data: ${err.message}`
					)
				);
		} else {
			console.log("NULL USER");
		}
	};

	/*
	 * Update the current user's custom data, no user passed because the user must be logged in
	 */
	const updateCustomUserData = async (
		newFirstName: string,
		newLastName: string
	) => {
		if (user) {
			const mongodb = user.mongoClient("mongodb-atlas");
			const custom_data_collection = mongodb
				.db("wilderness")
				.collection("User");
			const filter = {
				_partition: user.id,
			};

			const updateData = {
				$set: {
					firstName: newFirstName,
					lastName: newLastName,
				},
			};

			await custom_data_collection
				.updateOne(filter, updateData)
				.then((result) =>
					console.log(
						`Successfully updated custom data with _id: ${result.upsertedId}`
					)
				)
				.then(() => user.refreshCustomData())
				.catch((err) =>
					console.error(`Failed to update custom data: ${err}`)
				);
		} else {
			console.log("NULL USER");
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signUp,
				anonSignIn,
				emailSignIn,
				signOut,
				user,
				changePassword,
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
