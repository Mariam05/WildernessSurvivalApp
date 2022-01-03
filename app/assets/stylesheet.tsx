import { Platform, StyleSheet } from "react-native";
import colours from "./colours";

const globalStyles = StyleSheet.create({
	credentialInput: {
		height: 50,
		width: "85%",
		maxWidth: 350,
		margin: 12,
		borderWidth: 0,
		paddingHorizontal: 20,
		fontSize: 18,
		backgroundColor: colours.secondary,
		opacity: Platform.OS === "ios" ? 1 : 1,
		borderRadius: 25,
		shadowColor: colours.primary,
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colours.pinkBackground,
	},
	patientScrollView: {
		flex: 1,
		top: Platform.OS === "ios" ? 0 : -10,
		width: "100%",
		marginBottom: Platform.OS === "ios" ? -35 : -10
	},
	separator: {
		marginVertical: "5%",
	},
});

export default globalStyles;
