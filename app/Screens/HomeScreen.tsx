import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { useEffect } from "react";
import {
	Alert,
	Image,
	Keyboard,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from "react-native";

import AppButton from "../assets/components/AppButton";
import { useAuth } from "../../providers/AuthProvider";
import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";

export default function HomeScreen({ navigation }) {
	Platform.OS === "ios"
		? null
		: StatusBar.setBackgroundColor(colours.pinkBackground, true);

	const { user, anonSignIn } = useAuth();

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
					<View style={globalStyles.separator} />

					<Text style={[globalStyles.subHeader, { left: "5%" }]}>
						Need access now?
					</Text>
					<AppButton
						title="Continue Without Account"
						style={homeStyles.skipButton}
						buttonTextStyle={homeStyles.skipButtonText}
						onPress={onPressSkip}
					/>

					<View style={globalStyles.separator} />

					<View style={{ width: "90%", flexDirection: "row" }}>
						<View style={{ flex: 10 }}>
							<Text style={globalStyles.subHeader}>
								Have an account?
							</Text>
							<AppButton
								title="Login"
								style={globalStyles.loginButton}
								buttonTextStyle={globalStyles.loginButtonText}
								onPress={() => navigation.navigate("Login")}
							/>
						</View>

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
					</View>

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
				</SafeAreaView>
			</TouchableWithoutFeedback>
		);
	}
}

const homeStyles = StyleSheet.create({
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
});
