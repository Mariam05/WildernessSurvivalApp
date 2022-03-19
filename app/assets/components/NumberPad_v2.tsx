import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Dimensions,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
} from "react-native";
import colours from "../colours";
import globalStyles from "../stylesheet";
import AppButton from "./AppButton";

const numColumns = 3;

export default function NumberPad2({ navigation, onFinish = null, title }) {

	function retake() {
		const routes = navigation.getState()?.routes;
		console.log(routes);
		// const prevRoute = routes[routes.length - 3].name; // prepare
		const currRoute = routes[routes.length - 1].name; // the current route (either pulse or resp)
		navigation.push("Prepare", { next_vital: currRoute });
	}

	const data = [
		{ key: "1" },
		{ key: "2" },
		{ key: "3" },
		{ key: "4" },
		{ key: "5" },
		{ key: "6" },
		{ key: "7" },
		{ key: "8" },
		{ key: "9" },
		{ key: "DEL" },
		{ key: "0" },
		{ key: "ENTER" },
	];

	const [value, setValue] = useState("");

	const determineValue = ({ itemClicked }) => {
		if (itemClicked == null) {
			return;
		}
		if (itemClicked.key == "ENTER") {
			// perform the onFinish action
			if (onFinish) onFinish(value);
		} else if (itemClicked.key == "DEL") {
			setValue(value.substring(0, value.length - 1));
		} else {
			setValue(value + itemClicked.key);
		}
	};

	const renderItem = ({ item, index }) => {
		if (item.key == "ENTER" || item.key == "DEL") {
			return (
				<TouchableOpacity
					style={[styles.item, styles.itemSpecial]}
					onPress={() => {
						determineValue({ itemClicked: item });
					}}
				>
					<Text style={styles.itemText}>{item.key}</Text>
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => {
					determineValue({ itemClicked: item });
				}}
			>
				<Text style={styles.itemText}>{item.key}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colours.blue }}>
			<StatusBar barStyle="dark-content" backgroundColor="#CFE7EF" />
			<Text style={globalStyles.titleText}>{title}</Text>
			<View style={styles.valueContainer}>
				<Text style={styles.valueText}>{value}</Text>
			</View>
			<FlatList
				data={data}
				style={styles.container}
				renderItem={renderItem}
				numColumns={numColumns}
				scrollEnabled={false}
			/>
			<AppButton
				onPress={() => retake()}
				title="Retake"
				style={[styles.retakeButton]}
				buttonTextStyle={[styles.retakeButtonText]}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginTop: 40,
	},
	item: {
		backgroundColor: colours.yellowBackground,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		margin: 1,
		height: (0.75 * Dimensions.get("window").width) / numColumns, // approximate a square
		borderWidth: 1,
	},
	itemSpecial: {
		backgroundColor: colours.yellowDarker,
	},
	itemText: {
		color: colours.primary,
		fontSize: 25,
	},
	retakeButton: {
		alignSelf: "center",
		flexDirection: "column",
		height: 50,
		width: "100%",
		maxWidth: 350,
		marginBottom: "10%",
		backgroundColor: colours.primary,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	retakeButtonText: {
		fontSize: 20,
		color: colours.secondary,
		fontWeight: "bold",
		alignSelf: "center",
	},
	valueContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		height: 0.15 * Dimensions.get("window").height,
		backgroundColor: "#CFE7EF",
	},
	valueText: {
		fontSize: 50,
	},
});
