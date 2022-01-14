import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { createRef, useEffect, useState } from "react";
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
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(colours.pinkBackground, true);

	const passwordRef = React.createRef<TextInput>();
	
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

	const onPressSignIn = async () => {
		console.log("Trying sign in with user: " + username);
		try {
			await emailSignIn(username, password);
			navigation.navigate("Landing");
		} catch (error) {
			const errorMessage = `Failed to sign in: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
		setUsername("");
		setPassword("");
	};

	const onPressSkip = async () => {
		console.log("Anonymously signing in user!");
		try {
			await anonSignIn();
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
		return <AppLoading />;
	} else {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
				<SafeAreaView
					style={[globalStyles.container, {minHeight: windowHeight}]}
				>
					<StatusBar hidden={false} animated={true} backgroundColor={colours.pinkBackground} barStyle={"dark-content"} />
					
					<Text style={loginStyles.titleText}>{titleText}</Text>
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
    					onSubmitEditing={() => { passwordRef.current.focus(); }}
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

					<AppButton
						title="Skip"
						style={loginStyles.skipButton}
						buttonTextStyle={loginStyles.skipButtonText}
						onPress={onPressSkip}
					/>

					<AppButton
						title="Login"
						style={loginStyles.loginButton}
						buttonTextStyle={loginStyles.loginButtonText}
						onPress={onPressSignIn}
					/>

					<AppButton
						title="Register"
						style={loginStyles.registerButton}
						buttonTextStyle={loginStyles.registerButtonText}
						onPress={() => navigation.navigate("Register")}
					/>

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
		width: "85%",
		maxWidth: 350,
		margin: 12,
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
		width: "85%",
		maxWidth: 350,
		margin: 12,
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
		height: 40,
		width: "25%",
		maxWidth: 100,
		margin: 12,
		backgroundColor: "white",
		borderWidth: 0,
		borderRadius: 20,
		alignContent: "center",
		justifyContent: "center",
		position: "absolute",
		top: Platform.OS === "android" ? -5 : 40,
		right: 10,
		shadowColor: colours.primary,
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	skipButtonText: {
		fontSize: 17,
		color: colours.primary,
		alignSelf: "center",
	},
	titleText: {
		fontSize: 50,
		fontWeight: "700",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
		top: 0,
	},
});
