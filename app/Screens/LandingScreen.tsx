import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { useEffect } from "react";
import {
	Alert,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import { usePatients } from "../../providers/PatientProvider";
import PatientItem from "../assets/components/PatientItem";
import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";
import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";
import { Patient } from "../../schemas";

export default function LandingScreen({ navigation }) {
	const { patients, createPatient, openPatientRealm, closePatientRealm } =
		usePatients();

	const onPressPatient = (patient: Patient) => {
		navigation.navigate("Patient", {
			patientId: patient._id.toString(),
			patientName: patient.name,
		});
	};

	const onPressQuickVitals = (patient: Patient) => {
		// console.log("quick record vitals. Patient id: " + patient._id);
		navigation.push("RecordVitals", {
			patientId: patient._id,
		});
	};

	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) openPatientRealm();
		return () => closePatientRealm();
	}, [isFocused]);

	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	if (!fontsLoaded) {
		return <View />;
	} else {
		return (
			<SafeAreaView
				style={[
					globalStyles.container,
					{ backgroundColor: colours.redBackground },
				]}
			>
				<ProfileHeader
					navigation={navigation}
					statusbarColour={colours.redBackground}
				/>

				{patients.length > 0 ? (
					<ScrollView
						horizontal={false}
						style={[
							globalStyles.scrollView,
							{ backgroundColor: colours.yellowBackground },
						]}
						contentContainerStyle={{
							alignSelf: "stretch",
							paddingBottom: "30%",
						}}
					>
						{patients.map((patient, index: number) =>
							patient.isValid() ? (
								<PatientItem
									enabled={true}
									name={patient.name}
									age={patient.age}
									sex={patient.sex}
									timestamp={patient.timestamp}
									style={null}
									key={index}
									infoPress={() => onPressPatient(patient)}
									onPress={() => onPressQuickVitals(patient)}
								/>
							) : null
						)}
					</ScrollView>
				) : (
					<View
						style={[
							globalStyles.scrollView,
							{
								backgroundColor: colours.yellowBackground,
								alignItems: "center",
								justifyContent: "flex-end",
								paddingBottom: Platform.select({
									ios: "7.5%",
									android: "6.5%",
								}),
							},
						]}
					>
						<Text
							style={{
								fontSize: 35,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							{"Add your\nfirst patient!"}
						</Text>
						<Icon name="arrow-down" size={80} />
						<View
							style={{
								width: "25%",
								backgroundColor: colours.redBackground,
								height: undefined,
								aspectRatio: 1,
								borderRadius: 100,
							}}
						/>
					</View>
				)}
				<AddButton
					onPress={() => {
						let newPatient = createPatient();
						if (newPatient) {
							Alert.alert(
								"Next Step",
								"Would you like to record vitals or view details for this patient?",
								[
									{
										text: "Record Vitals Now",
										style: "default",
										onPress: () =>
											onPressQuickVitals(newPatient),
									},
									{
										text: "Patient Details",
										style: "default",
										onPress: () =>
											onPressPatient(newPatient),
									},
									{
										text: "Dismiss",
										style: "destructive",
									},
								]
							);
						}
					}}
				/>
			</SafeAreaView>
		);
	}
}

const landingStyles = StyleSheet.create({});
