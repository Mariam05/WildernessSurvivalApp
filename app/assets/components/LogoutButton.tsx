import React from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import colours from "../colours";
import AppButton from "./AppButton";

export default function LogoutButton({ closeRealm, navigation, signOut }) {
	return (
		<AppButton
			style={styles.logoutButton}
			title={"Logout"}
			buttonTextStyle={styles.logoutButtonText}
			onPress={() => {
				Alert.alert("Log Out?", null, [
					{
						text: "Yes, Log Out",
						style: "destructive",
						onPress: () => {
							navigation.popToTop();
							closeRealm();
							signOut();
						},
					},
					{ text: "Cancel", style: "cancel" },
				]);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	logoutButton: {
        alignSelf: "center",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "center",
		height: "5%",
		width: "50%",
		maxWidth: 350,
		margin: 12,
		backgroundColor: "tomato",
		borderWidth: 0,
		borderRadius: 25,
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
        elevation: 4,
	},
	logoutButtonText: {
		fontSize: 20,
		fontWeight: "600",
		alignSelf: "center"
	},
})
