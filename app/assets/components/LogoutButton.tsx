import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import styles from "../stylesheet";

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
