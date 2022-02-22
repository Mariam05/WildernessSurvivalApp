import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { useState, useEffect } from "react";
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
	const { user, emailSignIn } = useAuth();

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

					<Text style={globalStyles.titleText}>{titleText}</Text>
					<View style={globalStyles.separator} />

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

					<View style={globalStyles.separator} />

					<View style={{ width: "90%", flexDirection: "row" }}>
						<View style={{ flex: 10 }}>
							<AppButton
								title="Login"
								style={globalStyles.loginButton}
								buttonTextStyle={globalStyles.loginButtonText}
								onPress={onPressSignIn}
							/>
						</View>
					</View>

					<View style={{ width: "90%", flexDirection: "row" }}>
						<View style={{ flex: 10 }}>
							<Text style={globalStyles.subHeader}>Go Back?</Text>
							<AppButton
								title="Cancel"
								style={[
									globalStyles.loginButton,
									{ backgroundColor: "tomato" },
								]}
								buttonTextStyle={globalStyles.loginButtonText}
								onPress={() => navigation.goBack()}
							/>
						</View >

						<View style={{ flex: 1 }} />

						<View style={{ flex: 10 }}>
							<Text style={globalStyles.subHeader}>
								Want an account?
							</Text>
							<AppButton
								title="Register"
								style={globalStyles.registerButton}
								buttonTextStyle={
									globalStyles.registerButtonText
								}
								onPress={() => navigation.navigate("Register")}
							/>
						</View>
					</View >

					<View style={globalStyles.separator} />
					<View style={globalStyles.baseline}>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
						<Image
							style={globalStyles.baselineImage}
							source={require("../assets/images/grass.png")}
						/>
					</View>
				</SafeAreaView >
			</TouchableWithoutFeedback >
		);
	}
}

const loginStyles = StyleSheet.create({});
