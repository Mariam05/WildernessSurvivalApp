import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import colours from "../assets/colours";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title, style }) => (
	<TouchableOpacity onPress={onPress} style={style}>
		<Text style={styles.buttonText}>{title}</Text>
	</TouchableOpacity>
);

export default function LoginScreen(props) {
	const windowHeight = useWindowDimensions().height;
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
			<SafeAreaView
				behavior={"padding"}
				style={styles.container}
				minHeight={windowHeight}
			>
				<AppButton
					title="Register"
					style={styles.registerButton}
					onPress={() => console.log("Register Pressed")}
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
				/>
				<TextInput
					style={styles.credentialInput}
					returnKeyType="go"
					secureTextEntry={true}
					textContentType="password"
					placeholder="Password"
				/>
				<View style={styles.separator} />
				<AppButton
					title="Login"
					style={styles.loginButton}
					onPress={() => console.log("Login pressed")}
				/>
				<View style={styles.separator} />
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
	buttonText: {
		fontSize: 18,
		color: colours.primary,
		alignSelf: "center",
	},
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
		top: Platform.OS === "android" ? StatusBar.currentHeight - 20 : 40,
		right: 10,
	},
	separator: {
		marginVertical: "5%",
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	titleText: {
		fontSize: 50,
		fontWeight: "100",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
});
