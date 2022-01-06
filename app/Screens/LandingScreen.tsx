import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
    Alert,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { useAuth } from "../../providers/AuthProvider";
import { usePatients } from "../../providers/PatientProvider";
import { useVitals } from "../../providers/VitalProvider";

import AppButton from "../assets/components/AppButton";
import PatientItem, {patientItemStyles} from "../assets/components/PatientItem";
import { PatientModal } from "../assets/components/PatientModal";
import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";
import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";

const ages = ["?", "<18", "18-30", "30-50", "50-70", "70+"];
const sexes = ["Male", "Female", "Other"];

export default function LandingScreen() {
	const { user, signOut } = useAuth();
	const navigation = useNavigation();

	const [PatientFN, setPatientFN] = useState("");
	const [PatientLN, setPatientLN] = useState("");
	const [PatientAge, setPatientAge] = useState("");
	const [PatientSex, setPatientSex] = useState("");
	const [PatientImg, setPatientImg] = useState(0);

	const { patients, createPatient, deletePatient, closeRealm } = usePatients();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModal = () => setIsModalVisible(() => !isModalVisible);


    const onPressPatient = async (patient) => {
        console.log(patient) //uh code doesn't work unless this line is here lol.
        navigation.navigate("Patient", {
              id: patient._id,
              name: patient.name,
              vitals: patient.vitals,
        });
    };


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
				style={[globalStyles.container, {backgroundColor: colours.redBackground}]}
			>
				<ProfileHeader image={images[0]} statusbarColour={colours.redBackground}/>

				<ScrollView
					horizontal={false}
					style={[globalStyles.patientScrollView, {backgroundColor: colours.yellowBackground}]}
					contentContainerStyle={{
						alignSelf: "stretch",
						paddingBottom: "30%",
					}}
				>
					{patients.map((patient, index) => (
						<PatientItem
							enabled={true}
							name={patient.name}
							age={patient.age}
							sex={patient.sex}
							style={null}
							image={images[patient.image]}
							key={index}
							onPress={() => onPressPatient(patient)}
						/>
					))}
				</ScrollView>
				<AddButton onPress={handleModal}/>

				<PatientModal isVisible={isModalVisible}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<ScrollView
							style={{ top: Platform.OS == "ios" ? "5%" : 0, }}
							keyboardDismissMode="on-drag"
							keyboardShouldPersistTaps="never"
						>
							<PatientModal.Container>
								<PatientModal.Header />
								<PatientModal.Body>
									<View style={{marginVertical: "3%"}} />
									<PatientItem
										enabled={false}
										onPress={null}
										name={PatientFN + " " + PatientLN}
										age={PatientAge}
										sex={PatientSex}
										image={images[PatientImg]}
										style={{width: "90%"}}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={modalStyles.modalSubHeadingText}>
										Profile Picture
									</Text>
									<ScrollView
										horizontal={true}
										style={{
											padding: 10,
											height: "10%",
											marginHorizontal: "-4%",
										}}
									>
										{images.map((image, index) => (
											<TouchableOpacity
												onPress={() => setPatientImg(index)}
												key={index}
											>
												<View
													style={[patientItemStyles.patientPicture, { elevation: 2 }]}
												>
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
											</TouchableOpacity>
										))}
									</ScrollView>
									<View style={{marginVertical: "3%"}} />
									<TextInput
										style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="First Name"
										autoCapitalize="words"
										autoCorrect={false}
										value={PatientFN}
										onChangeText={setPatientFN}
										onSubmitEditing={() => { this.secondTextInput.focus(); }}
									/>
									<View style={{marginVertical: "3%"}} />
									<TextInput
										ref={(input) => { this.secondTextInput = input; }}
										style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="Last Name"
										autoCapitalize="words"
										autoCorrect={false}
										value={PatientLN}
										onChangeText={setPatientLN}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={modalStyles.modalSubHeadingText}>Age</Text>
									<SegmentedControl
										values={ages}
										onValueChange={setPatientAge}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={modalStyles.modalSubHeadingText}>Sex</Text>
									<SegmentedControl
										values={sexes}
										onValueChange={setPatientSex}
									/>
								</PatientModal.Body>
								<PatientModal.Footer>
									<AppButton
										title="Cancel"
										style={modalStyles.modalCancelButton}
										buttonTextStyle={modalStyles.modalButtonText}
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
										buttonTextStyle={modalStyles.modalButtonText}
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
							</PatientModal.Container>
						</ScrollView>
					</KeyboardAvoidingView>
				</PatientModal>
			</SafeAreaView>
		);
	}
}

const landingStyles = StyleSheet.create({

});

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
		backgroundColor: colours.blue,
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