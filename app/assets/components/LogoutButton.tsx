import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import colours from "../colours";

export default function LogoutButton({
	closeRealm,
	navigation,
	signOut,
	style,
	textStyle,
}) {
	return (
		<TouchableOpacity
			style={style}
			onPress={() => {
				Alert.alert("Log Out?", null, [
					{
						text: "Log Out",
						style: "destructive",
						onPress: () => {
							navigation.popToTop();
							//closeRealm();
							signOut();
						},
					},
					{ text: "Cancel", style: "cancel" },
				]);
			}}
		>
			<Text style={[textStyle, { color: "tomato" }]}>
				<Icon
					size={35}
					name="log-out-outline"
					color="tomato"
					backgroundColor="transparent"
				/>
				{"\t"}
				Logout
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	logoutButton: {
		alignSelf: "center",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "center",
		height: "10%",
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
		alignSelf: "center",
	},
});
