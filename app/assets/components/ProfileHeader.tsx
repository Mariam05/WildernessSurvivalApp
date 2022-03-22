import { Platform, StatusBar, StyleSheet, View } from "react-native";

import colours from "../colours";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect } from "react";

export default function ProfileHeader({ statusbarColour, navigation }) {
	Platform.OS === "ios"
		? null
		: StatusBar.setBackgroundColor(statusbarColour, true);

	const { user } = useAuth();
	useEffect(() => {
		user && user.customData && user.refreshCustomData();
	}, [user]);

	return (
		<View style={styles.header}>
			<View style={styles.profileView}>
				<Icon
					size={35}
					name="settings-outline"
					color={colours.yellowBackground}
					backgroundColor="transparent"
					onPress={() => navigation.navigate("Menu")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 0.1,
		flexDirection: "column",
		alignItems: "flex-start",
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60 : 0,
		width: "100%",
		backgroundColor: colours.redBackground,
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
		height: "100%",
		margin: 20,
		alignContent: "center",
		justifyContent: "flex-end",
		flexDirection: "row",
		backgroundColor: "transparent",
	},
});
