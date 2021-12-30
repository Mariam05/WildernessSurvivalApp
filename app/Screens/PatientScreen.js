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
	LayoutAnimation,
	View,
	UIManager,
} from "react-native";

import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

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
		yLabel: "BPM",
		data: [
			{
				timestamp: "1640705088",
				value: 20,
			},
			{
				timestamp: "1640708857",
				value: 45,
			},
			{
				timestamp: "1640712857",
				value: 34,
			},
		],
	},
	{
		title: "Heat Check",
		timeElapsed: 43,
		type: "numerical",
		periodicity: 60,
		yLabel: "Celsius",
		data: [
			{
				timestamp: "1640705088",
				value: 42,
			},
			{
				timestamp: "1640708857",
				value: 145,
			},
			{
				timestamp: "1640712857",
				value: 21,
			},
		],
	},
	{
		title: "Radial Pulse",
		timeElapsed: 34,
		type: "numerical",
		periodicity: 60,
		yLabel: "BPM",
		data: [
			{
				timestamp: "1640705088",
				value: 25,
			},
			{
				timestamp: "1640708857",
				value: 15,
			},
			{
				timestamp: "1640712857",
				value: 74,
			},
		],
	},
	{
		title: "Grip Strength",
		timeElapsed: 34,
		type: "categorical",
		periodicity: 60,
		data: [
			{
				timestamp: "1640705088",
				value: "strong",
			},
			{
				timestamp: "1640708857",
				value: "medium",
			},
			{
				timestamp: "1640712857",
				value: "weak",
			},
		],
	},
	{
		title: "General Notes",
		type: "special",
		data: [
			{
				timestamp: "1640705088",
				value: "Patient has exhibited signs of hypothermia.",
			},
			{
				timestamp: "1640708857",
				value: "Patient has fainted.",
			},
			{
				timestamp: "1640712857",
				value: "Someone get help",
			},
		],
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


const RenderTimeElapsed = ({ item }) => {
	const containsTimeElapsed = item.hasOwnProperty("timeElapsed")
	const isOverdue = item.timeElapsed > item.periodicity

	if (containsTimeElapsed){
			return (<Text style={isOverdue ? styles.timeElapsedRedText : styles.timeElapsedGreenText}
							>{item.timeElapsed} min ago</Text>)
	}
	return (null)
}


const RenderChart = ({ item }) => {
	if (item.type!=="numerical")
		return (null)

	return (<VictoryChart
				theme={VictoryTheme.material}
 				domainPadding={{x:0, y: 15}}
				padding={{top:0, bottom:35, left:50, right:50}}
				margin={{top:0}}
				height={180}
			>
			<VictoryLine
				style={{
					data: { stroke: "#c43a31"},
					parent: { border: "1px solid #ccc", fill: "#000000"}
				}}
				x={(d) => new Date(d.timestamp*1000)}
				y="value"
				data={item.data}
			/>
		</VictoryChart>)
}


const RenderVitalsItem = ({
	item,
	onPressInfo,
	onPressAdd,
}) => {
	//using function hack to keep track of state
	function RenderVitalsItemFunc(){
			const [open, setopen] = useState(false);
			const onPress = () => {
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				setopen(!open);
			};

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
							/>
						</View>

						<AppButton
								title="Add"
								style={styles.newReadingButton}
								buttonTextStyle={styles.newReadingButtonText}
								onPress={onPressAdd}
						/>
					</TouchableOpacity>
					{open && (
						<RenderChart item={item}/>
					)}

			</View>
		)
	}
	return RenderVitalsItemFunc()
};


export default function PatientScreen({ navigation }) {
	// Enable animation for drop-down graph
	if (Platform.OS === 'android') {
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

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
				{/* Code for top-level login header */}
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

				{/* Code for patient level header */}
				<View style={styles.headerPatient}>
					<View style={styles.profileView}>
						<Text style={styles.patientName}>Devin Atner</Text>
						<TouchableOpacity>
							<Image
								style={styles.profilePicture}
								source={chongo}
							/>
						</TouchableOpacity>
					</View>
					<AppButton
						title="PDF"
						style={styles.pdfButton}
						buttonTextStyle={styles.pdfButtonText}
						onPress={() => console.log("generate pdf")}
					/>
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
	container: {
		flex: 1,
		backgroundColor: colours.background,
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
	headerPatient: {
		backgroundColor: colours.orange,
		height: Platform.OS == "ios" ? "10%" : "7%",
		width: "100%",
		flex: 0.1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	patientName: {
		margin: -10,
		alignSelf: "center",
		fontSize: 25,
		fontWeight: "700",
	},
	pdfButton: {
		height: "60%",
		top: "20%",
		flex: 1,
		backgroundColor: colours.lightBlueBackground,
		borderRadius: 15,
		color: colours.primary,
		position: "absolute",
		right: 10,
		alignSelf: "center",
		borderColor: colours.primary,
		borderWidth: 1,
		padding: 6,
	},
	pdfButtonText: {
		fontSize: 20,
		fontWeight: "600",
		top: Platform.OS == "ios" ? -4 : -1,
	},
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


	newReadingButton: {
		backgroundColor: colours.purple,
		height: "70%",
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
		fontSize: 15,
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
		marginBottom: 0,
		paddingBottom: 0,
		paddingLeft: 20,
		fontSize: 30,
		height: 60,
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
