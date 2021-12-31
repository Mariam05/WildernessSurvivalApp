import React from "react";
import { Image, Text, View } from "react-native";

import styles from "../stylesheet";

export default function DummyPatientItem({
	name,
	sex,
	age,
	image,
	style,
	width,
}) {
	return (
		<View style={[style, {width: width}]} >
			<View style={styles.patientPicture} >
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
				<Text style={styles.patientItemNameText}>
					{(name && name.length > 1) ? name
						.toLowerCase()
						.split(" ")
						.map((word) =>
							word ? word.replace(word[0], word[0].toUpperCase()) : null
						)
						.join(" ") : "New Patient"}
				</Text>
				<Text style={styles.patientItemDetailsText}>Sex: {sex}</Text>
				<Text style={styles.patientItemDetailsText}>Age: {age}</Text>
			</View>
		</View>
	);
}
