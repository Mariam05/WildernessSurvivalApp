import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
	Image,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	TextInput,
	useWindowDimensions,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { useAuth } from "../../providers/AuthProvider";
import { usePatients } from "../../providers/PatientProvider";
import AppButton from "../assets/components/AppButton";
import LogoutButton from "../assets/components/LogoutButton";
import PatientItem from "../assets/components/PatientItem";
import DummyPatientItem from "../assets/components/DummyPatientItem";
import { PatientModal } from "../assets/components/PatientModal";
import styles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";

const ages = ["?", "<18", "18-30", "30-50", "50-70", "70+"];
const sexes = ["Male", "Female", "Other"];

//TouchableOpacity.defaultProps = { activeOpacity: 0.4 };

export default function LandingScreen() {
	const windowHeight = useWindowDimensions().height;

	const { user, signOut } = useAuth();
	const navigation = useNavigation();

	const [PatientFN, setPatientFN] = useState("");
	const [PatientLN, setPatientLN] = useState("");
	const [PatientAge, setPatientAge] = useState("");
	const [PatientSex, setPatientSex] = useState("");
	const [PatientImg, setPatientImg] = useState(0);

	const { patients, createPatient, deletePatient, closeRealm } =
		usePatients();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
				style={styles.landingContainer}
			>
				<StatusBar hidden={false} backgroundColor={colours.redBackground} barStyle={"dark-content"}/>
				<View style={styles.landingHeader}>
					<LogoutButton
						closeRealm={closeRealm}
						signOut={signOut}
						navigation={navigation}
					/>
					<View style={styles.profileView}>
						<TouchableOpacity onPress={() => console.log(user.id)}>
							<Image
								style={styles.profilePicture}
								source={images[0]}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView
					horizontal={false}
					style={styles.patientScrollView}
					contentContainerStyle={{
						alignSelf: "stretch",
						paddingBottom: 150,
					}}
				>
					{patients.map((patient, index) => (
						<PatientItem
							name={patient.name}
							age={patient.age}
							sex={patient.sex}
							image={images[patient.image]}
							style={styles.patientItem}
							key={index}
							onPress={() =>
								console.log(patient.name + " Pressed!")
							}
						/>
					))}
				</ScrollView>
				<AppButton
					title="+"
					style={styles.newPatientButton}
					buttonTextStyle={styles.newPatientButtonText}
					onPress={handleModal}
				/>

				<PatientModal isVisible={isModalVisible}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<ScrollView>
							<PatientModal.Container>
								<PatientModal.Header />
								<PatientModal.Body>
									<View style={{marginVertical: "3%"}} />
									<DummyPatientItem
										name={PatientFN + " " + PatientLN}
										age={PatientAge}
										sex={PatientSex}
										image={images[PatientImg]}
										style={styles.patientItem}
										width={"90%"}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={styles.modalSubHeadingText}>
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
													style={[{width: Platform.OS === "ios" ? "100%" : "90%"}, styles.patientPicture]} 
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
										style={[styles.credentialInput, {width: "100%", margin:0}]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="First Name"
										autoCapitalize="none"
										autoCorrect={false}
										value={PatientFN}
										onChangeText={setPatientFN}
									/>
									<View style={{marginVertical: "3%"}} />
									<TextInput
										style={[styles.credentialInput, {width: "100%", margin:0}]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="Last Name"
										autoCapitalize="none"
										autoCorrect={false}
										value={PatientLN}
										onChangeText={setPatientLN}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={styles.modalSubHeadingText}>Age</Text>
									<SegmentedControl
										values={ages}
										onValueChange={setPatientAge}
									/>
									<View style={{marginVertical: "3%"}} />
									<Text style={styles.modalSubHeadingText}>Sex</Text>
									<SegmentedControl
										values={sexes}
										onValueChange={setPatientSex}
									/>
								</PatientModal.Body>
								<PatientModal.Footer>
									<AppButton
										title="Cancel"
										style={styles.modalCancelButton}
										buttonTextStyle={styles.loginButtonText}
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
										style={styles.modalSubmitButton}
										buttonTextStyle={styles.loginButtonText}
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
