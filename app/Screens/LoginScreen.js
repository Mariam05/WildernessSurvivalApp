import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	Button,
	Font,
	Image,
	ImageBackground,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextBase,
	TextInput,
	View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colours from "../assets/colours";

export default function LoginScreen(props) {
	const titleText = "Wilderness\nVital Tracking";

	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.registerButton}>
					<Button
						title="Register"
						color={colours.primary}
						onPress={() => console.log("Register pressed")}
					/>
				</View>
				<Text style={styles.titleText}>{titleText}</Text>
				<View style={styles.separator} />
				<TextInput
					style={styles.credentialInput}
					clearButtonMode="while-editing"
					keyboardType="email-address"
					returnKeyType="next"
					textContentType="username"
					placeholder="Username"
					value={value}
				/>
				<TextInput
					style={styles.credentialInput}
					returnKeyType="go"
					secureTextEntry={true}
					textContentType="password"
					placeholder="Password"
					value={value}
				/>
				<View style={styles.separator} />
				<View style={styles.loginButton}>
					<Button
						title="Login"
						color={colours.primary}
						onPress={() => console.log("Login pressed")}
					/>
				</View>
				<View style={styles.baseline}>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
					<Image
						style={styles.baselineImage}
						source={require("../assets/grass.png")}
					/>
				</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	baseline: {
		width: "100%",
		height: 100,
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		resizeMode: "repeat",
		bottom: 20,
	},
	baselineImage: {
		margin: -15,
	},
	container: {
		flex: 1,
		backgroundColor: colours.background,
		alignItems: "center",
		justifyContent: "center",
	},
	credentialInput: {
		height: 50,
		width: "85%",
		maxWidth: 350,
		margin: 12,
		borderWidth: 0,
		paddingHorizontal: 20,
		fontSize: 18,
		backgroundColor: colours.secondary,
		opacity: 0.7,
		borderRadius: 25,
	},
	loginButton: {
		flexDirection: "column",
		height: 50,
		width: "80%",
		maxWidth: 300,
		margin: 12,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	registerButton: {
		flexDirection: "column",
		height: 40,
		width: "25%",
		maxWidth: 100,
		margin: 12,
		backgroundColor: colours.blue,
		borderWidth: 0,
		borderRadius: 20,
		alignContent: "center",
		justifyContent: "center",
		position: "absolute",
		top: Platform.OS === "android" ? StatusBar.currentHeight : 40,
		right: 10,
	},
	separator: {
		marginVertical: 40,
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	titleText: {
		fontSize: 50,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
});
