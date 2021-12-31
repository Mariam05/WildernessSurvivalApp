import { Platform, StatusBar, StyleSheet } from "react-native";
import colours from "./colours";

const styles = StyleSheet.create({
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
	landingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colours.yellowBackground,
	},
	landingHeader: {
		backgroundColor: colours.redBackground,
		width: "100%",
		flex: 0.1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60: 40,
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
	},
	loginButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	loginContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colours.pinkBackground,
	},
	logoutButton: {
		height: Platform.OS == "ios" ? "35%" : "50%",
		left: 20,
		flex: 1,
	},
	logoutButtonText: {
		fontSize: 20,
		fontWeight: "600",
	},
	modalBody: {
		justifyContent: "center",
		paddingHorizontal: 15,
		minHeight: 10,
	},
	modalCancelButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.blue,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	modalContainer: {
		backgroundColor: colours.pinkBackground,
		borderRadius: 25,
		borderColor: "#000",
		height: Platform.OS == "ios" ? "90%" : "100%",
	},
	modalFooter: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		flexDirection: "row",
	},
	modalHeader: {
		alignItems: "center",
		justifyContent: "center",
	},
	modalHeaderText: {
		paddingTop: 10,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "500",
	},
	modalSubHeadingText: {
		fontSize: 17,
		fontWeight: "500",
	},
	modalSubmitButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	newPatientButton: {
		flexDirection: "column",
		width: Platform.OS == "ios" ? 80 : 60,
		aspectRatio: 1,
		backgroundColor: colours.pinkBackground,
		borderRadius: 100,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: "5%",
		shadowColor: colours.primary,
		shadowOpacity: 0.9,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 4,
		elevation: 7,
	},
	newPatientButtonText: {
		fontSize: 60,
		fontWeight: "600",
		top: Platform.OS == "ios" ? -4 : -14,
	},
	patientItem: {
		flexDirection: "row",
		padding: 10,
		margin: 10,
		marginBottom: 15,
		fontSize: 30,
		height: 80,
		width: "75%",
		alignSelf: "center",
		justifyContent: "flex-start",
		backgroundColor: colours.blue,
		borderRadius: 100,
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 1, height: 3 },
		shadowRadius: 3,
		elevation: 10,
	},
	patientItemDetailsText: {
		fontSize: 12,
		color: colours.primary,
		alignSelf: "flex-start",
	},
	patientItemNameText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "flex-start",
	},
	patientPicture: {
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 0,
		marginRight: 15,
		borderRadius: 100,
		backgroundColor: colours.secondary,
		height: "100%", 
		aspectRatio: 1,
		shadowColor: colours.primary,
		shadowOpacity: 0.8,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	patientScrollView: {
		flex: 1,
		width: "100%",
		marginBottom: -50,
	},
	profilePicture: {
		resizeMode: "cover",
		borderRadius: 100,
		margin: 0,
		backgroundColor: colours.secondary,
		height: "110%",
		aspectRatio: 1,
	},
	profileView: {
		height: "50%",
		margin: 20,
		alignContent: "center",
		justifyContent: "flex-end",
		flexDirection: "row",
		flex: 0.5,
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
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60 : 40,
		right: 10,
	},
	registerButtonText: {
		fontSize: 17,
		color: colours.primary,
		alignSelf: "center",
	},
	separator: {
		marginVertical: "5%",
	},
	titleText: {
		fontSize: 50,
		fontWeight: "100",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60 : 40,
	},
	userName: {
		margin: -10,
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "700",
	},
});

export default styles;
