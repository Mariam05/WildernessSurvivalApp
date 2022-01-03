import React from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LogoutButton({ closeRealm, navigation, signOut }) {
	return (
		<TouchableOpacity
			style={styles.logoutButton}
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
		>
			<Text style={styles.logoutButtonText}>Logout</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	logoutButton: {
		height: Platform.OS == "ios" ? "35%" : "50%",
		left: 20,
		flex: 1,
	},
	logoutButtonText: {
		fontSize: 20,
		fontWeight: "600",
	},
})
