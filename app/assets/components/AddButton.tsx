import { Platform, StatusBar, StyleSheet } from "react-native";

import AppButton from "./AppButton";
import colours from "../colours";

export default function AddButton({onPress}) {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(colours.redBackground, true);

    return (
        <AppButton
					title="+"
					style={styles.addButton}
					buttonTextStyle={styles.addButtonText}
					onPress={onPress}
				/>

    );
}

const styles = StyleSheet.create({
	addButton: {
		flexDirection: "column",
		width: "20%", 
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
	addButtonText: {
		fontSize: 60,
		fontWeight: "700",
		top: "-5%"
	},
});
