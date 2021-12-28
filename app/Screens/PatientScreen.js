import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

import { LineChart } from "react-native-chart-kit";


import colours from "../assets/colours";
import afro from "../assets/humaaans/Single_Pieces/Head/Front/Afro.png";
import curly from "../assets/humaaans/Single_Pieces/Head/Front/Curly.png";
import airy from "../assets/humaaans/Single_Pieces/Head/Front/Airy.png";
import caesar from "../assets/humaaans/Single_Pieces/Head/Front/Caesar.png";
import chongo from "../assets/humaaans/Single_Pieces/Head/Front/Chongo.png";
import hijab from "../assets/humaaans/Single_Pieces/Head/Front/Hijab1.png";
import short1 from "../assets/humaaans/Single_Pieces/Head/Front/Short1.png";
import wavy from "../assets/humaaans/Single_Pieces/Head/Front/Wavy.png";
import short2 from "../assets/humaaans/Single_Pieces/Head/Front/Short2.png";
import rad from "../assets/humaaans/Single_Pieces/Head/Front/Rad.png";
import beard from "../assets/humaaans/Single_Pieces/Head/Front/ShortBeard.png";

TouchableOpacity.defaultProps = { activeOpacity: 0.4 };

const DATA = [
	{
		title: "Pedal Pulse",
		timeElapsed: 68,
		type: "numerical",
		periodicity: 60,
		expanded: false,
		data: {
			labels: ["1640705088", "1640706857", "1640708857", "1640710857", "1640712857"],
			data: [81, 67, 55, 43, 51]
		}
	},
	{
		title: "Heat Check",
		timeElapsed: 43,
		type: "numerical",
		periodicity: 60,
		expanded: false,
		data: {
			labels: ["1640705088", "1640706857", "1640708857", "1640710857", "1640712857"],
			data: [86, 72, 112, 101, 42],
		},
	},
	{
		title: "Radial Pulse",
		timeElapsed: 34,
		type: "numerical",
		periodicity: 60,
		expanded: false,
		data: {
			labels: ["1640705088", "1640706857", "1640708857", "1640710857", "1640712857"],
			data: [46, 24, 12, 25, 12],
		},
	},
	{
		title: "Grip Strength",
		timeElapsed: 34,
		type: "numerical",
		periodicity: 60,
		expanded: false,
		data: {
			labels: ["1640705088", "1640706857", "1640708857", "1640710857", "1640712857"],
			data: [46, 125, 67, 55, 102],
		},
	},
	{
		title: "General Notes",
		type: "special",
		data: {
			labels: ["1640705088", "1640706857", "1640708857", "1640710857"],
			data: [
				"Patient has exhibited signs of hypothermia.",
				"Patient has glassy eyes.",
				"Patient has fainted.",
				"Someone get help",
			],
		},
	},
	{
		title: "Photos",
		type: "special",
		data: {
			labels: [],
			data: [],
		},
	},
];




const AppButton = ({ onPress, title, style, buttonTextStyle }) => (
	<TouchableOpacity onPress={onPress} style={style}>
		<Text style={buttonTextStyle}>{title}</Text>
	</TouchableOpacity>
);



const RenderTimeElapsed = ({item, containsTimeElapsed, isOverdue}) => {
	if (containsTimeElapsed){
			return (<Text style={isOverdue ? styles.timeElapsedRedText : styles.timeElapsedGreenText}
							>{item.timeElapsed} min ago</Text>)
	}
	return (null)
}


const RenderVitalsItem = ({
	item,
	onPress,
	onPressInfo,
	onPressAdd,
	isActive
}) => {
	const containsTimeElapsed = "timeElapsed" in item
	const isOverdue = item.timeElapsed > item.periodicity

	return (
		<View>
			<TouchableOpacity
					onPress={onPress}
					style={styles.vitalsHeader}>
					<View margin={0} />

				<AppButton
						title="i"
						style={styles.infoButton}
						buttonTextStyle={styles.infoButtonText}
						onPress={onPressInfo}
				/>

				<View>
					<Text style={styles.buttonText}>{item.title}</Text>
					<RenderTimeElapsed
							item={item}
							containsTimeElapsed={containsTimeElapsed}
							isOverdue = {isOverdue}
					/>
				</View>

				<AppButton
						title="Add"
						style={styles.newReadingButton}
						buttonTextStyle={styles.newReadingButtonText}
						onPress={onPressAdd}
				/>
			</TouchableOpacity>
			<LineChart
				data={item.data}
			/>
		</View>
	)
};



export default function PatientScreen({ navigation }) {
	//hooks for collapsible data
	const [activeSections, setActiveSections] = useState([]);
	const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

	const windowHeight = useWindowDimensions().height;


	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView
				behavior={"padding"}
				style={styles.container}
				minHeight={windowHeight}
			>
				{/* Code for top-level header */}
				<View style={styles.header}>
					<AppButton
						title="Logout"
						style={styles.backButton}
						buttonTextStyle={styles.backButtonText}
						onPress={() => navigation.goBack()}
					/>
					<View style={styles.profileView}>
						<Text style={styles.userName}>John Doe</Text>
						<TouchableOpacity onPress={() => console.log("profile viewing")}>
							<Image
								style={styles.profilePicture}
								source={afro}
							/>
						</TouchableOpacity>
					</View>
				</View>

				{/* Code for list of vitals */}
				<FlatList
					style={styles.vitalsScrollView}
					contentContainerStyle={{
						alignSelf: "stretch",
						paddingBottom: 100,
					}}
					data={DATA}
					renderItem={({ item }) => (
						<RenderVitalsItem
							item={item}

							onPressInfo={() => console.log(item.title + " info pressed")}
							onPressAdd={() => console.log(item.title + " add new reading")}
							onPress={() => console.log(item.title + " Pressed")}
						/>
					)}
					keyExtractor={(item, index) => index}
				/>

				{/* Code for add new vital button*/}
				<AppButton
					title="+"
					style={styles.newVitalButton}
					buttonTextStyle={styles.newVitalButtonText}
					onPress={() => console.log("New Vital Pressed")}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	backButton: {
		height: Platform == "ios" ? "35%" : "50%",
		left: 20,
		flex: 1,
		top: Platform == "ios" ? 5 : 0,
	},
	backButtonText: {
		fontSize: 20,
		fontWeight: "600",
	},
	buttonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "flex-start",
	},
	buttonSecondaryText: {
		fontSize: 13,
		color: colours.primary,
		alignSelf: "flex-start",
	},

	content: {
    padding: 20,
    backgroundColor: '#fff',
  },
	timeElapsedRedText: {
		fontSize: 13,
		color: colours.redText,
		alignSelf: "flex-start",
	},
	timeElapsedGreenText: {
		fontSize: 13,
		color: colours.greenText,
		alignSelf: "flex-start",
	},

	container: {
		flex: 1,
		backgroundColor: colours.yellowBackground,
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		backgroundColor: colours.redBackground,
		height: Platform.OS == "ios" ? "15%" : "7%",
		width: "100%",
		flex: 0.1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	newReadingButton: {
		backgroundColor: colours.purple,
		borderRadius: 15,
		color: colours.primary,
		position: "absolute",
		right: 10,
		alignSelf: "center",
		borderColor: colours.primary,
		borderWidth: 1,
		padding: 6,
	},
	newReadingButtonText: {
		fontSize: 20,
		fontWeight: "300",
		top: Platform.OS == "ios" ? -4 : -1,
	},
	infoButton: {
		flexDirection: "column",
		width: Platform.OS == "ios" ? 30: 20,
		aspectRatio: 1,
		backgroundColor: colours.purple,
		borderRadius: 100,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		left: -5,
		top: -5,
		shadowColor: colours.primary,
		shadowOpacity: 0.9,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 4,
		elevation: 7,
	},

	infoButtonText: {
		fontSize: 30,
		fontWeight: "300",
		top: Platform.OS == "ios" ? -2 : -6,
	},
	newVitalButton: {
		flexDirection: "column",
		width: Platform.OS == "ios" ? 80 : 60,
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
	newVitalButtonText: {
		fontSize: 60,
		fontWeight: "600",
		top: Platform.OS == "ios" ? -4 : -14,
	},
	vitalsHeader: {
		flexDirection: "row",
		padding: 10,
		margin: 10,
		marginBottom: 15,
		paddingLeft: 20,
		fontSize: 30,
		height: 70,
		width: "80%",
		alignSelf: "center",
		justifyContent: "flex-start",
		fontWeight: "900",
		backgroundColor: colours.lightBlueBackground,
		borderRadius: 20,
		shadowColor: colours.primary,
		shadowOpacity: 0.8,
		shadowOffset: { width: 1, height: 3 },
		shadowRadius: 3,
		elevation: 10,
	},
	vitalsScrollView: {
		flex: 1,
		width: "100%",
	},
	profilePicture: {
		alignSelf: "center",
		resizeMode: "cover",
		borderRadius: 100,
		margin: 0,
		marginLeft: 20,
		borderRadius: 30,
		backgroundColor: colours.secondary,
		height: "110%",
		aspectRatio: 1,
	},
	profileView: {
		height: "50%",
		margin: 10,
		alignContent: "center",
		justifyContent: "center",
		flexDirection: "row",
		flex: 0.5,
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: "bold",
		backgroundColor: "rgba(247,247,247,1.0)",
	},
	separator: {
		marginVertical: "5%",
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	userName: {
		margin: -10,
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "700",
	},
});
