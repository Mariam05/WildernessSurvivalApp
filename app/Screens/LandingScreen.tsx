import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { createRef, useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Icon from "react-native-vector-icons/Ionicons";

import { usePatients } from "../../providers/PatientProvider";
import AppButton from "../assets/components/AppButton";
import PatientItem, { patientItemStyles } from "../assets/components/PatientItem";
import { PatientModal } from "../assets/components/PatientModal";
import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";
import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";
import { Patient } from "../../schemas";

const ages = ["?", "<18", "18-30", "30-50", "50-70", "70+"];
const sexes = ["Male", "Female", "Other"];

export default function LandingScreen({ navigation }) {
	const [PatientFN, setPatientFN] = useState("");
	const [PatientLN, setPatientLN] = useState("");
	const [PatientAge, setPatientAge] = useState("");
	const [PatientSex, setPatientSex] = useState("");
	const [PatientImg, setPatientImg] = useState(0);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { patients, createPatient, openPatientRealm, closePatientRealm } =
		usePatients();

	const handleModal = () => setIsModalVisible(() => !isModalVisible);
	const lastNameRef = createRef<TextInput>();

	const onPressPatient = (patient: Patient) => {
		navigation.navigate("Patient", {
			patientId: patient._id.toString(),
			patientName: patient.name,
		});
	};

	const onPressQuickVitals = (patient: Patient) => {
		// console.log("quick record vitals. Patient id: " + patient._id);
		navigation.push("RecordVitals", {
			patientId: patient._id
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
				style={[globalStyles.container, { backgroundColor: colours.redBackground }]}
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
								paddingBottom: "7.5%",
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
				<AddButton onPress={handleModal} />

				<PatientModal isVisible={isModalVisible}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<ScrollView
							style={{ top: Platform.OS == "ios" ? "5%" : 0 }}
							keyboardDismissMode="on-drag"
							keyboardShouldPersistTaps="never"
						>
							<PatientModal.Container>
								<PatientModal.Header />
								<PatientModal.Body>
									<View style={{ marginVertical: "3%" }} />
									<PatientItem
										enabled={false}
										onPress={null}
										infoPress={null}
										name={PatientFN + " " + PatientLN}
										age={PatientAge}
										sex={PatientSex}
										timestamp={Date.now()}
										style={{ width: "90%" }}
									/>
									<View style={{ marginVertical: "3%" }} />
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Name
									</Text>
									<TextInput
										style={[
											globalStyles.credentialInput,
											{ width: "100%", margin: 0 },
										]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="First Name"
										autoCapitalize="words"
										autoCorrect={false}
										value={PatientFN}
										onChangeText={setPatientFN}
										onSubmitEditing={() => {
											lastNameRef.current.focus();
										}}
									/>
									<View style={{ marginVertical: "3%" }} />
									<TextInput
										ref={lastNameRef}
										style={[globalStyles.credentialInput, { width: "100%", margin: 0 }]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="Last Name"
										autoCapitalize="words"
										autoCorrect={false}
										value={PatientLN}
										onChangeText={setPatientLN}
									/>
									<View style={{ marginVertical: "3%" }} />
									<Text style={modalStyles.modalSubHeadingText}>Age</Text>
									<SegmentedControl
										values={ages}
										onValueChange={setPatientAge}
									/>
									<View style={{ marginVertical: "3%" }} />
									<Text style={modalStyles.modalSubHeadingText}>Sex</Text>
									<SegmentedControl
										values={sexes}
										onValueChange={setPatientSex}
									/>
								</PatientModal.Body >
								<PatientModal.Footer>
									<AppButton
										title="Cancel"
										style={modalStyles.modalCancelButton}
										buttonTextStyle={
											modalStyles.modalButtonText
										}
										onPress={() => {
											setPatientImg(0);
											setPatientFN("");
											setPatientLN("");
											setPatientAge(null);
											setPatientSex(null);
											handleModal();
										}}
									/>
									<AppButton
										title="Submit"
										style={modalStyles.modalSubmitButton}
										buttonTextStyle={
											modalStyles.modalButtonText
										}
										onPress={() => {
											createPatient(
												PatientImg,
												PatientFN + " " + PatientLN,
												PatientAge,
												PatientSex
											);
											setPatientImg(0);
											setPatientFN("");
											setPatientLN("");
											setPatientAge(null);
											setPatientSex(null);
											handleModal();
										}}
									/>
								</PatientModal.Footer>
							</PatientModal.Container >
						</ScrollView >
					</KeyboardAvoidingView >
				</PatientModal >
			</SafeAreaView >
		);
	}
}

const landingStyles = StyleSheet.create({});

const modalStyles = StyleSheet.create({
	modalButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	modalCancelButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: "tomato",
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	modalSubHeadingText: {
		fontSize: 17,
		fontWeight: "500",
	},
	modalSubmitButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
});
