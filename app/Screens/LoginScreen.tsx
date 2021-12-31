import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";

import AppButton from "../assets/components/AppButton";
import { useAuth } from "../../providers/AuthProvider";
import styles from "../assets/stylesheet";
import colours from "../assets/colours";

export default function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { user, signUp, signIn } = useAuth();

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

	const onPressSignIn = async () => {
		console.log("Trying sign in with user: " + username);
		try {
			await signIn(username, password);
		} catch (error) {
			const errorMessage = `Failed to sign in: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
		setUsername("");
		setPassword("");
	};

	const onPressSignUp = async () => {
		console.log("Trying Sign Up with user: " + username);
		try {
			await signUp(username, password);
			signIn(username, password);
		} catch (error) {
			const errorMessage = `Failed to sign up: ${error.message}`;
			console.error(errorMessage);
			Alert.alert(errorMessage);
		}
	};

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView
				style={[styles.loginContainer, {minHeight: windowHeight}]}
			>
				<StatusBar hidden={false} backgroundColor={colours.pinkBackground} barStyle={"dark-content"}/>
				<AppButton
					title="Register"
					style={styles.registerButton}
					buttonTextStyle={styles.registerButtonText}
					onPress={onPressSignUp}
				/>
				<Text style={styles.titleText}>{titleText}</Text>
				<View style={styles.separator} />
				<TextInput
					style={styles.credentialInput}
					clearButtonMode="while-editing"
					keyboardType="email-address"
					returnKeyType="next"
					textContentType="username"
					placeholder="Username"
					onChangeText={(text) => setUsername(text)}
					value={username}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<TextInput
					style={styles.credentialInput}
					returnKeyType="go"
					secureTextEntry={true}
					textContentType="password"
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<View style={styles.separator} />
				<AppButton
					title="Login"
					style={styles.loginButton}
					buttonTextStyle={styles.loginButtonText}
					onPress={onPressSignIn}
				/>
				<View style={styles.separator} />
				<View style={styles.baseline}>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/images/grass.png")}
					/>
				</View>
			</SafeAreaView>
		);
	}
}
