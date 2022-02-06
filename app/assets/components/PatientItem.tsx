import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Moment from "moment";

import colours from "../colours";

function PatientItem({
	enabled,
	infoPress,
	onPress,
	name,
	sex,
	age,
	timestamp,
	style,
}) {
	return (
		<TouchableOpacity
			style={[patientItemStyles.patientItem, style]}
			onPress={onPress}
			disabled={!enabled}
		>
			<TouchableOpacity
				onPress={infoPress}
				style={patientItemStyles.infoButton}
				disabled={!enabled}
			>
				<Text style={patientItemStyles.infoButtonText}>i</Text>
			</TouchableOpacity>
			<View style={{ borderWidth: 0, flex: 1 }}>
				<Text style={patientItemStyles.patientItemNameText}>
					{name
						.toLowerCase()
						.split(" ")
						.map((word) =>
							word != ""
								? word.replace(word[0], word[0].toUpperCase())
								: null
						)
						.join(" ")}
				</Text>
				<Text style={patientItemStyles.patientItemDetailsText}>
					Sex: {sex}
				</Text>
				<Text style={patientItemStyles.patientItemDetailsText}>
					Age: {age}
				</Text>
				<Text style={patientItemStyles.patientItemDetailsText}>
					{Moment(new Date(timestamp)).format("DD-MM-YYYY")}
				</Text>
			</View>
			<View>
				<Text
					style={{
						fontSize: 50,
						marginTop: "-5%",
						paddingRight: 10,
						textShadowColor: "#555",
						textShadowOffset: { height: 2, width: 1 },
						textShadowRadius: 4,
					}}
				>
					+
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const patientItemStyles = StyleSheet.create({
	infoButton: {
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 0,
		marginRight: 15,
		borderRadius: 100,
		backgroundColor: colours.purple,
		height: "100%",
		aspectRatio: 1,
		shadowColor: colours.primary,
		shadowOpacity: 0.8,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	infoButtonText: {
		fontSize: 40,
		fontWeight: "normal",
		textAlign: "center",
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
		alignItems: "center",
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
});

export default PatientItem;
export { patientItemStyles };
