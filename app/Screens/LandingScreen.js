import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	SectionList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
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
		title: "D",
		data: [
			{ image: airy, name: "Devin", sex: "F", age: 20 },
			{ image: curly, name: "Dan", sex: "M", age: 50 },
			{ image: chongo, name: "Dominic", sex: "M", age: 15 },
		],
	},
	{
		title: "J",
		data: [
			{ image: caesar, name: "Jackson", sex: "M", age: 10 },
			{ image: short1, name: "James", sex: "M", age: 26 },
			{ image: hijab, name: "Jillian", sex: "F", age: 32 },
			{ image: short2, name: "Jimmy", sex: "M", age: 24 },
			{ image: rad, name: "Joel", sex: "M", age: 35 },
			{ image: beard, name: "John", sex: "M", age: 65 },
			{ image: wavy, name: "Julie", sex: "F", age: 94 },
		],
	},
];

const AppButton = ({ onPress, title, style, buttonTextStyle }) => (
	<TouchableOpacity onPress={onPress} style={style}>
		<Text style={buttonTextStyle}>{title}</Text>
	</TouchableOpacity>
);

const PatientItem = ({
	onPress,
	name,
	sex,
	age,
	image,
	style,
	buttonTextStyle,
	buttonSecondaryTextStyle,
}) => (
	<TouchableOpacity onPress={onPress} style={style}>
		<View margin={0} />
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
			<Text style={buttonTextStyle}>{name}</Text>
			<Text style={buttonSecondaryTextStyle}>Sex: {sex}</Text>
			<Text style={buttonSecondaryTextStyle}>Age: {age}</Text>
		</View>
	</TouchableOpacity>
);

export default function LandingScreen({ navigation }) {
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
				<View style={styles.header}>
					<AppButton
						title="Logout"
						style={styles.backButton}
						buttonTextStyle={styles.backButtonText}
						onPress={() => navigation.goBack()}
					/>
					<View style={styles.profileView}>
						<Text style={styles.userName}>John Doe</Text>
						<TouchableOpacity
							onPress={() => console.log("profile viewing")}
						>
							<Image
								style={styles.profilePicture}
								source={afro}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<SectionList
					style={styles.patientScrollView}
					contentContainerStyle={{
						alignSelf: "stretch",
						paddingBottom: 100,
					}}
					sections={DATA}
					renderItem={({ item }) => (
						<PatientItem
							image={item.image}
							name={item.name}
							sex={item.sex}
							age={item.age}
							onPress={() => console.log(item.name + " Pressed")}
							style={styles.patientItem}
							buttonTextStyle={styles.buttonText}
							buttonSecondaryTextStyle={
								styles.buttonSecondaryText
							}
						/>
					)}
					renderSectionHeader={({ section }) => (
						<Text style={styles.sectionHeader}>
							{section.title}
						</Text>
					)}
					keyExtractor={(item, index) => index}
				/>

				<AppButton
					title="+"
					style={styles.newPatientButton}
					buttonTextStyle={styles.newPatientButtonText}
					onPress={() => console.log("New Patient Pressed")}
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
	baseline: {
		width: "100%",
		height: 100,
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		resizeMode: "repeat",
		bottom: 0,
	},
	baselineImage: {
		margin: -15,
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
	newPatientButton: {
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
	newPatientButtonText: {
		fontSize: 60,
		fontWeight: "600",
		top: Platform.OS == "ios" ? -4 : -14,
	},
	patientItem: {
		flexDirection: "row",
		padding: 10,
		margin: 10,
		marginBottom: 15,
		fontSize: 30,
		height: 80,
		width: "70%",
		alignSelf: "center",
		justifyContent: "flex-start",
		fontWeight: "900",
		backgroundColor: colours.blue,
		borderRadius: 100,
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 1, height: 3 },
		shadowRadius: 3,
		elevation: 10,
	},
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
		elevation: 8,
	},
	patientScrollView: {
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
