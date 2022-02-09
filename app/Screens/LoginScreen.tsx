import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from "react-native";

import AppButton from "../assets/components/AppButton";
import { useAuth } from "../../providers/AuthProvider";
import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";

export default function LoginScreen({ navigation }) {
	Platform.OS === "ios"
		? null
		: StatusBar.setBackgroundColor(colours.pinkBackground, true);

	const passwordRef = React.createRef<TextInput>();

	const [loggingIn, setLoggingIn] = useState<boolean>(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { user, emailSignIn, anonSignIn } = useAuth();

	const windowHeight = useWindowDimensions().height;
	const titleText = "Wilderness\nVital Tracking";

	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	useEffect(() => {
		// If there is a user logged in, go to the Landing page.
		if (user != null) {
			navigation.navigate("Landing");
		}
	}, [user]);

	const asyncSignInWarning = async () => {
		return new Promise<boolean>((response) => {
			Alert.alert(
				"Login?",
				"Logging in will lose all patient data currently stored in the app",
				[
					{
						text: "Login",
						style: "destructive",
						onPress: () => {
							console.log("Logging in");
							response(true);
						},
					},
					{
						text: "Cancel",
						style: "cancel",
						onPress: () => {
							console.log("Cancelling");
							response(false);
						},
					},
				]
			);
		});
	};

	const onPressSignIn = async () => {
		if (loggingIn == false) {
			setLoggingIn(true);
		} else {
			console.log("Trying sign in with user: " + username);
			try {
				let response = null; // default they want to sign in
				user
					? (response = await asyncSignInWarning())
					: (response = true); // Warn user if they have already "Continued without an account"
				if (response) {
					console.log("Signing in user");
					await emailSignIn(username, password);
					navigation.navigate("Landing");
					setLoggingIn(false);
				}
			} catch (error) {
				const errorMessage = `Failed to sign in: ${error.message}`;
				console.error(errorMessage);
				Alert.alert(errorMessage);
			}
			setUsername("");
			setPassword("");
		}
	};

	const onPressSkip = async () => {
		try {
			if (!user) {
				console.log("Anonymously signing in user!");
				await anonSignIn();
			}
			navigation.navigate("Landing");
		} catch (error) {
			const errorMessage = `Failed to sign in: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
		setUsername("");
		setPassword("");
	};

	if (!fontsLoaded) {
		return <View />;
	} else {
		return (
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<SafeAreaView
					style={[
						globalStyles.container,
						{ minHeight: windowHeight },
					]}
				>
					<StatusBar
						hidden={false}
						animated={true}
						backgroundColor={colours.pinkBackground}
						barStyle={"dark-content"}
					/>

					<Text style={loginStyles.titleText}>{titleText}</Text>
					<View style={globalStyles.separator} />
					{loggingIn ? (
						<>
							<TextInput
								style={globalStyles.credentialInput}
								clearButtonMode="while-editing"
								keyboardType="email-address"
								returnKeyType="next"
								textContentType="username"
								placeholder="Email"
								onChangeText={(text) => setUsername(text)}
								value={username}
								autoCapitalize="none"
								autoCorrect={false}
								onSubmitEditing={() => {
									passwordRef.current.focus();
								}}
							/>

							<TextInput
								ref={passwordRef}
								style={globalStyles.credentialInput}
								returnKeyType="done"
								secureTextEntry={true}
								textContentType="password"
								placeholder="Password"
								value={password}
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={(text) => setPassword(text)}
								onSubmitEditing={onPressSignIn}
							/>
						</>
					) : null}
					<View style={globalStyles.separator} />

					{!loggingIn ? (
						<>
							<Text
								style={[loginStyles.subHeader, { left: "5%" }]}
							>
								Need access now?
							</Text>
							<AppButton
								title="Continue Without Account"
								style={loginStyles.skipButton}
								buttonTextStyle={loginStyles.skipButtonText}
								onPress={onPressSkip}
							/>
						</>
					) : null}

					<View style={globalStyles.separator} />

					<View style={{ width: "90%", flexDirection: "row" }}>
						<View style={{ flex: 10 }}>
							{!loggingIn ? (
								<Text style={loginStyles.subHeader}>
									Have an account?
								</Text>
							) : null}
							<AppButton
								title="Login"
								style={loginStyles.loginButton}
								buttonTextStyle={loginStyles.loginButtonText}
								onPress={onPressSignIn}
							/>
							{loggingIn ? (
								<AppButton
									title="Cancel"
									style={[
										loginStyles.loginButton,
										{
											backgroundColor: "tomato",
											marginTop: 15,
										},
									]}
									buttonTextStyle={
										loginStyles.loginButtonText
									}
									onPress={() => setLoggingIn(false)}
								/>
							) : null}
						</View>

						{!loggingIn ? (
							<>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 10 }}>
									<Text style={loginStyles.subHeader}>
										Want an account?
									</Text>
									<AppButton
										title="Register"
										style={loginStyles.registerButton}
										buttonTextStyle={
											loginStyles.registerButtonText
										}
										onPress={() =>
											navigation.navigate("Register")
										}
									/>
								</View>
							</>
						) : null}
					</View>

					<View style={globalStyles.separator} />
					<View style={loginStyles.baseline}>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={loginStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}

const loginStyles = StyleSheet.create({
	baseline: {
		width: "100%",
		height: 100,
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		resizeMode: "repeat",
		bottom: Platform.OS === "ios" ? "5%" : 0,
	},
	baselineImage: {
		margin: -15,
	},
	loginButton: {
		flexDirection: "column",
		height: 50,
		width: "100%",
		maxWidth: 350,
		marginVertical: 5,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	loginButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	registerButton: {
		flexDirection: "column",
		height: 50,
		width: "100%",
		maxWidth: 350,
		marginVertical: 5,
		backgroundColor: colours.blue,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	registerButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	skipButton: {
		flexDirection: "column",
		height: 100,
		width: "90%",
		maxWidth: 350,
		marginVertical: 5,
		backgroundColor: colours.secondary,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	skipButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
		fontWeight: "bold",
	},
	subHeader: {
		fontSize: 17,
		fontWeight: "bold",
		color: "grey",
		alignSelf: "flex-start",
	},
	titleText: {
		fontSize: 50,
		fontWeight: "700",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
		top: 0,
	},
});
