import React, { useState } from "react";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { useAuth } from "../../providers/AuthProvider";
import colours from "../assets/colours";
import AppButton from "../assets/components/AppButton";
import globalStyles from "../assets/stylesheet";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "../assets/components/LogoutButton";
import { usePatients } from "../../providers/PatientProvider";

export default function ProfileScreen() {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(colours.blue);

	const navigation = useNavigation();

	const { user, signOut, updateCustomUserData, changePassword } = useAuth();
	const { closePatientRealm } = usePatients();

	const lastNameRef = React.createRef<TextInput>();
	const emailRef = React.createRef<TextInput>();
	const newPassRef = React.createRef<TextInput>();
	const confirmRef = React.createRef<TextInput>();

	const [editing, setEditing] = useState(false);
	const [editPassword, setEditPassword] = useState(false);

	const [firstName, setFirstName] = useState(user.customData.firstName);
	const [lastName, setLastName] = useState(user.customData.lastName);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
	const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState("");
	const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
	const [confirmNewPasswordErrorMessage, setConfirmNewPasswordErrorMessage] =
		useState("");

	const onPressSubmitEdit = async () => {
		console.log("Done Editing!");
		formatStrings();
		validateInput();
		await updateCustomUserData(firstName, lastName);
		await user.refreshCustomData();
	};

	const onPressChangePassword = async () => {
		Alert.alert(
			"Change Password?",
			"Changing your password will log you out and require that you log in with your new credentials",
			[
				{
					text: "Change Password",
					style: "destructive",
					onPress: async () => {
						if (validateChangePassword()) {
							try {
								await changePassword(
									user.profile.email,
									oldPassword,
									newPassword
								);
								navigation.popToTop();
								closePatientRealm();
								signOut();
							} catch (error) {
								Alert.alert(
									"There was an error",
									error.message,
									[{ text: "Ok", style: "default" }]
								);
							}
						}
					},
				},
				{ text: "Cancel", style: "cancel" },
			]
		);
	};

	const formatStrings = () => {
		let formattedFN = firstName
			.split(" ")
			.map(function (word: string) {
				return (
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);
			})
			.join(" ");
		setFirstName(formattedFN);

		let formattedLN = lastName
			.split(" ")
			.map(function (word: string) {
				return (
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);
			})
			.join(" ");
		setLastName(formattedLN);
	};

	const validateInput = (): boolean => {
		let error = true;

		if (firstName === "") {
			setFirstNameErrorMessage("Must enter a valid first name");
			error = false;
		}
		if (lastName === "") {
			setLastNameErrorMessage("Must enter a valid last name");
			error = false;
		}
		return error;
	};

	const validateChangePassword = () => {
		let error = true;
		let specialCharPattern = new RegExp("^(?=.*[-+_!@#$%^&*?]).+$");
		let numericCharPattern = new RegExp("^(?=.*\\d).+$");
		let uppercaseCharPattern = new RegExp("^(?=.*[A-Z]).+$");
		let lowercaseCharPattern = new RegExp("^(?=.*[a-z]).+$");

		if (oldPassword === "") {
			setOldPasswordErrorMessage("Must enter your old password");
			error = false;
		}
		if (newPassword.length < 8 || newPassword.length > 24) {
			setNewPasswordErrorMessage(
				"Must be between 8 and 24 characters long"
			);
			error = false;
		} else if (!lowercaseCharPattern.test(newPassword)) {
			setNewPasswordErrorMessage("Must contain a lowercase letter");
			error = false;
		} else if (!uppercaseCharPattern.test(newPassword)) {
			setNewPasswordErrorMessage("Must contain an uppercase letter");
			error = false;
		} else if (!numericCharPattern.test(newPassword)) {
			setNewPasswordErrorMessage("Must contain a number");
			error = false;
		} else if (!specialCharPattern.test(newPassword)) {
			setNewPasswordErrorMessage(
				"Must contain at least one of the following: !, @, #, $, %, ^, &, *, -, +, _, ?"
			);
			error = false;
		}
		if (confirmNewPassword === "") {
			setConfirmNewPasswordErrorMessage("Must confirm password");
			error = false;
		}
		if (newPassword != confirmNewPassword) {
			setConfirmNewPasswordErrorMessage("Passwords do not match");
			error = false;
		}
		if (newPassword === oldPassword) {
			setNewPasswordErrorMessage(
				"New password cannot be the same as the old password"
			);
			error = false;
		}
		return error;
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView
				style={[
					globalStyles.container,
					{ backgroundColor: colours.blue },
				]}
			>
				<StatusBar
					hidden={false}
					animated={true}
					backgroundColor={colours.blue}
					barStyle={"dark-content"}
				/>

				<Text style={profileStyles.titleText}>Profile</Text>

				<KeyboardAvoidingView
					style={{ flex: 1, width: "100%", top: 10 }}
					behavior={"padding"}
				>
					<ScrollView style={profileStyles.containerScrollView}>
						{editing ? (
							<>
								<Text style={profileStyles.subHeading}>
									Personal Details:
								</Text>
								<TextInput
									style={[
										globalStyles.credentialInput,
										{
											backgroundColor:
												firstNameErrorMessage
													? "tomato"
													: "white",
										},
									]}
									blurOnSubmit={false}
									clearButtonMode="while-editing"
									keyboardType="default"
									returnKeyType="next"
									textContentType="username"
									placeholder="First Name"
									onChangeText={(text) => {
										setFirstNameErrorMessage("");
										setFirstName(text);
									}}
									value={firstName}
									autoCapitalize="none"
									autoCorrect={false}
									autoCompleteType="name"
									onSubmitEditing={() => {
										lastNameRef.current.focus();
									}}
								/>
								{firstNameErrorMessage.length > 0 && (
									<Text style={profileStyles.errorMessage}>
										{firstNameErrorMessage}
									</Text>
								)}
								<TextInput
									ref={lastNameRef}
									style={[
										globalStyles.credentialInput,
										{
											backgroundColor:
												lastNameErrorMessage
													? "tomato"
													: "white",
										},
									]}
									blurOnSubmit={false}
									clearButtonMode="while-editing"
									keyboardType="default"
									returnKeyType="next"
									textContentType="username"
									placeholder="Last Name"
									onChangeText={(text) => {
										setLastNameErrorMessage("");
										setLastName(text);
									}}
									value={lastName}
									autoCapitalize="none"
									autoCorrect={false}
									autoCompleteType="name"
									onSubmitEditing={() => {
										emailRef.current.focus();
									}}
								/>
								{lastNameErrorMessage.length > 0 && (
									<Text style={profileStyles.errorMessage}>
										{lastNameErrorMessage}
									</Text>
								)}

								<View style={globalStyles.separator} />

								<Text style={profileStyles.subHeading}>
									Contact Details:
								</Text>
								<View style={profileStyles.credentialOutput}>
									<Text
										style={[
											profileStyles.smallEditText,
											{ alignSelf: "flex-start", top: 0 },
										]}
									>
										Email:
									</Text>
									<Text style={profileStyles.credentialText}>
										{user.profile.email}
									</Text>
								</View>

								<View style={globalStyles.separator} />
								{editPassword ? (
									<>
										<Text style={profileStyles.subHeading}>
											Change Password:
										</Text>

										<TextInput
											style={[
												globalStyles.credentialInput,
												{
													backgroundColor:
														oldPasswordErrorMessage
															? "tomato"
															: "white",
												},
											]}
											blurOnSubmit={false}
											returnKeyType="next"
											secureTextEntry={true}
											textContentType="password"
											placeholder="Old Password"
											value={oldPassword}
											autoCapitalize="none"
											autoCorrect={false}
											autoCompleteType="password"
											onChangeText={(text) => {
												setOldPasswordErrorMessage("");
												setOldPassword(text);
											}}
											onSubmitEditing={() =>
												newPassRef.current.focus()
											}
										/>
										{oldPasswordErrorMessage.length > 0 && (
											<Text
												style={
													profileStyles.errorMessage
												}
											>
												{oldPasswordErrorMessage}
											</Text>
										)}
										<TextInput
											ref={newPassRef}
											style={[
												globalStyles.credentialInput,
												{
													backgroundColor:
														newPasswordErrorMessage
															? "tomato"
															: "white",
												},
											]}
											blurOnSubmit={false}
											returnKeyType="next"
											secureTextEntry={true}
											textContentType="password"
											placeholder="New Password"
											value={newPassword}
											autoCapitalize="none"
											autoCorrect={false}
											autoCompleteType="password"
											onChangeText={(text) => {
												setNewPasswordErrorMessage("");
												setNewPassword(text);
											}}
											onSubmitEditing={() =>
												confirmRef.current.focus()
											}
										/>
										{newPasswordErrorMessage.length > 0 && (
											<Text
												style={
													profileStyles.errorMessage
												}
											>
												{newPasswordErrorMessage}
											</Text>
										)}
										<TextInput
											ref={confirmRef}
											style={[
												globalStyles.credentialInput,
												{
													backgroundColor:
														confirmNewPasswordErrorMessage
															? "tomato"
															: "white",
												},
											]}
											blurOnSubmit={false}
											returnKeyType="done"
											secureTextEntry={true}
											textContentType="password"
											placeholder="Confirm New Password"
											value={confirmNewPassword}
											autoCapitalize="none"
											autoCorrect={false}
											autoCompleteType="password"
											onChangeText={(text) => {
												setConfirmNewPasswordErrorMessage(
													""
												);
												setConfirmNewPassword(text);
											}}
											onSubmitEditing={
												onPressChangePassword
											}
										/>
										{confirmNewPasswordErrorMessage.length >
											0 && (
											<Text
												style={
													profileStyles.errorMessage
												}
											>
												{confirmNewPasswordErrorMessage}
											</Text>
										)}

										<View
											style={{
												flexDirection: "row",
												alignSelf: "center",
												top: "5%",
												height: "5%",
											}}
										>
											<AppButton
												title="Cancel"
												style={[
													profileStyles.changePasswordButton,
													{
														backgroundColor:
															"tomato",
														height: "100%",
													},
												]}
												buttonTextStyle={
													profileStyles.changePasswordButtonText
												}
												onPress={() =>
													setEditPassword(false)
												}
											/>
											<AppButton
												title="Submit"
												style={[
													profileStyles.changePasswordButton,
													{
														backgroundColor:
															colours.green,
														height: "100%",
													},
												]}
												buttonTextStyle={
													profileStyles.changePasswordButtonText
												}
												onPress={onPressChangePassword}
											/>
										</View>
										<View style={globalStyles.separator} />
									</>
								) : (
									<>
										<AppButton
											title="Change Password"
											style={
												profileStyles.changePasswordButton
											}
											buttonTextStyle={
												profileStyles.changePasswordButtonText
											}
											onPress={() =>
												setEditPassword(true)
											}
										/>
									</>
								)}
							</>
						) : (
							<>
								<Text style={profileStyles.subHeading}>
									Personal Details:
								</Text>
								<View style={profileStyles.credentialOutput}>
									<Text
										style={[
											profileStyles.smallEditText,
											{ alignSelf: "flex-start", top: 0 },
										]}
									>
										First Name:
									</Text>
									<Text style={profileStyles.credentialText}>
										{firstName}
									</Text>
								</View>

								<View style={profileStyles.credentialOutput}>
									<Text
										style={[
											profileStyles.smallEditText,
											{ alignSelf: "flex-start", top: 0 },
										]}
									>
										Last Name:
									</Text>
									<Text style={profileStyles.credentialText}>
										{lastName}
									</Text>
								</View>

								<View style={globalStyles.separator} />

								<Text style={profileStyles.subHeading}>
									Contact Details:
								</Text>
								<View style={profileStyles.credentialOutput}>
									<Text
										style={[
											profileStyles.smallEditText,
											{ alignSelf: "flex-start", top: 0 },
										]}
									>
										Email:
									</Text>
									<Text style={profileStyles.credentialText}>
										{user.profile.email}
									</Text>
								</View>

								<View style={globalStyles.separator} />

								<LogoutButton
									navigation={navigation}
									closeRealm={closePatientRealm}
									signOut={signOut}
								/>
							</>
						)}
						<View style={globalStyles.separator} />
					</ScrollView>
				</KeyboardAvoidingView>

				<AppButton
					title="Back"
					onPress={() => {
						navigation.goBack();
						console.log("Going Back!");
					}}
					style={profileStyles.backButton}
					buttonTextStyle={profileStyles.backButtonText}
				/>

				<AppButton
					title={editing ? "Done" : "Edit"}
					onPress={() => {
						setEditing(!editing);
						setEditPassword(false);
						editing ? onPressSubmitEdit() : console.log("Editing!");
					}}
					style={profileStyles.editButton}
					buttonTextStyle={profileStyles.backButtonText}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const profileStyles = StyleSheet.create({
	backButton: {
		flexDirection: "column",
		height: "5%",
		width: "15%",
		maxWidth: 100,
		margin: 12,
		backgroundColor: colours.pinkBackground,
		borderWidth: 0,
		borderRadius: 20,
		alignContent: "center",
		justifyContent: "center",
		position: "absolute",
		top: Platform.OS === "ios" ? 45 : 0,
		left: 10,
		shadowColor: colours.primary,
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	backButtonText: {
		fontSize: 17,
		color: colours.primary,
		alignSelf: "center",
	},
	changePasswordButton: {
		alignSelf: "center",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "center",
		height: "10%",
		width: "45%",
		maxWidth: 350,
		margin: 5,
		backgroundColor: colours.yellowBackground,
		borderWidth: 0,
		borderRadius: 25,
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	changePasswordButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	credentialOutput: {
		alignSelf: "center",
		alignContent: "center",
		justifyContent: "center",
		height: 50,
		width: "85%",
		maxWidth: 350,
		margin: 12,
		borderWidth: 0,
		paddingHorizontal: 10,
		backgroundColor: colours.blue,
		borderRadius: 10,
		shadowColor: colours.primary,
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	credentialText: {
		color: colours.primary,
		fontSize: 18,
	},
	containerScrollView: {
		top: 0,
		bottom: 0,
		paddingTop: 20,
	},
	editButton: {
		flexDirection: "column",
		height: "5%",
		width: "15%",
		maxWidth: 100,
		margin: 12,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 20,
		alignContent: "center",
		justifyContent: "center",
		position: "absolute",
		top: Platform.OS === "ios" ? 45 : 0,
		right: 10,
		shadowColor: colours.primary,
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	errorMessage: {
		color: "red",
		left: "10%",
		width: "80%",
		fontSize: 15,
		fontWeight: "400",
		marginTop: -10,
	},
	smallEditText: {
		top: 5,
		color: "gray",
		fontSize: 15,
		fontWeight: "500",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
	profilePicture: {
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 0,
		marginRight: 15,
		borderRadius: 100,
		backgroundColor: colours.secondary,
		height: "95%",
		aspectRatio: 1,
		shadowColor: colours.primary,
		shadowOpacity: 0.8,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 5,
	},
	titleText: {
		top: Platform.OS === "ios" ? 0 : 0,
		fontSize: 40,
		fontWeight: "500",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
	subHeading: {
		fontSize: 25,
		fontWeight: "100",
		textAlign: "left",
		fontFamily: "Oxygen_700Bold",
		left: 20,
	},
});
