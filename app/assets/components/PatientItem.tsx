import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import colours from "../colours";

function PatientItem({ enabled, onPress, name, sex, age, image, style }) {
	
	if (enabled) {
		return (
			<TouchableOpacity style={[patientItemStyles.patientItem, style]} onPress={onPress}>
				<View style={patientItemStyles.patientPicture}>
					<Image
						style={{
							width: "100%",
							height: undefined,
							aspectRatio: 1,
							resizeMode: "cover",
							borderRadius: 100,
						}}
						source={image}
					/>
				</View>
				<View>
					<Text style={patientItemStyles.patientItemNameText}>
						{name
							.toLowerCase()
							.split(" ")
							.map((word) =>
								word.replace(word[0], word[0].toUpperCase())
							)
							.join(" ")}
					</Text>
					<Text style={patientItemStyles.patientItemDetailsText}>Sex: {sex}</Text>
					<Text style={patientItemStyles.patientItemDetailsText}>Age: {age}</Text>
				</View>
			</TouchableOpacity>
		);
	}
	return (
		<View style={[patientItemStyles.patientItem, style]} >
		<View style={patientItemStyles.patientPicture} >
			<Image
				style={{
					width: "100%",
					height: undefined,
					aspectRatio: 1,
					resizeMode: "cover",
					borderRadius: 100,
				}}
				source={image}
			/>
		</View>
		<View>
			<Text style={patientItemStyles.patientItemNameText}>
				{(name && name.length > 1) ? name
					.toLowerCase()
					.split(" ")
					.map((word) =>
						word ? word.replace(word[0], word[0].toUpperCase()) : null
					)
					.join(" ") : "New Patient"}
			</Text>
			<Text style={patientItemStyles.patientItemDetailsText}>Sex: {sex}</Text>
			<Text style={patientItemStyles.patientItemDetailsText}>Age: {age}</Text>
		</View>
	</View>);

}

const patientItemStyles = StyleSheet.create({
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
});

export default PatientItem;
export { patientItemStyles };
