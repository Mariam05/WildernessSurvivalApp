import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function AppButton({ onPress, title, style, buttonTextStyle }) {
	return (
		<TouchableOpacity onPress={onPress} style={style}>
			<Text style={buttonTextStyle}>{title}</Text>
		</TouchableOpacity>
	);
}
