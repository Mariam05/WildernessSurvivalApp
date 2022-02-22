import React from "react";
import {
	Image,
	LayoutAnimation,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import colours from "../../assets/colours";
import globalStyles from "../../assets/stylesheet";

export default function AnatomyScreen() {
	const navigation = useNavigation();

	return (
		<SafeAreaView
			style={[
				globalStyles.container,
				{
					backgroundColor: colours.blue,
				},
			]}
		>
			<Text
				style={[
					anatomyStyles.header,
					{
						alignSelf: "center",
						top: 50,
						position: "absolute",
					},
				]}
			>
				Anatomy
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignSelf: "flex-start",
					marginHorizontal: "5%",
					marginTop: 10,
				}}
			>
				<Icon
					name="chevron-back"
					size={17}
					backgroundColor="transparent"
					color="black"
					onPress={() => navigation.goBack()}
				>
					Back
				</Icon>
			</View>

			<Text>In Progress...</Text>
			<ScrollView
				contentContainerStyle={{
					alignItems: "center",
					paddingBottom: 50,
				}}
				style={globalStyles.scrollView}
			>
				<View style={globalStyles.separator} />

				{/*Pulse Points*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text style={anatomyStyles.header}>
						Pulse/ Pressure Points
					</Text>
					<Image
						source={require("../../assets/images/pulsePoints.png")}
						style={anatomyStyles.pulsePointsImage}
					/>
				</View>

				<View style={globalStyles.separator} />

				{/*Airways*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text style={anatomyStyles.header}>Airway Anatomy</Text>
					<Image
						source={require("../../assets/images/airwayAnatomy.png")}
						style={anatomyStyles.airwayImage}
					/>
				</View>

				<View style={globalStyles.separator} />

				{/*Abdomonal*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text style={anatomyStyles.header}>
						Abdomonal Quadrants
					</Text>
					<Text style={anatomyStyles.subHeader}>
						(Looking at patient)
					</Text>
					<Text style={anatomyStyles.infoText}>
						Tenderness in quadrant suggests potential injury to the
						organ indicated in the chart
					</Text>
					<Image
						source={require("../../assets/images/abdomonalQuadrants.png")}
						style={anatomyStyles.abdomonalImage}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const anatomyStyles = StyleSheet.create({
	abdomonalImage: {
		alignSelf: "center",
		height: undefined,
		width: "100%",
		aspectRatio: 4 / 5,
		resizeMode: "contain",
		padding: 20,
		marginBottom: 5,
		marginHorizontal: 0,
	},
	airwayImage: {
		alignSelf: "center",
		height: undefined,
		width: "100%",
		aspectRatio: 4 / 5,
		resizeMode: "contain",
		padding: 20,
		marginHorizontal: 0,
	},
	header: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 25,
	},
	infoText: {
		alignSelf: "flex-start",
		fontWeight: "normal",
		fontSize: 12,
	},
	pulsePointsImage: {
		alignSelf: "center",
		height: undefined,
		width: "100%",
		aspectRatio: 3 / 5,
		resizeMode: "contain",
		padding: 20,
		marginHorizontal: 0,
	},
	subHeader: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 20,
		color: "grey",
	},
});
