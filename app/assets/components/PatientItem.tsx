import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "../stylesheet";

export default function PatientItem({ onPress, name, sex, age, image, style }) {
	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<View style={styles.patientPicture}>
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
					{name
						.toLowerCase()
						.split(" ")
						.map((word) =>
							word.replace(word[0], word[0].toUpperCase())
						)
						.join(" ")}
				</Text>
				<Text style={styles.patientItemDetailsText}>Sex: {sex}</Text>
				<Text style={styles.patientItemDetailsText}>Age: {age}</Text>
			</View>
		</TouchableOpacity>
	);
}
