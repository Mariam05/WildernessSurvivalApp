import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import { ObjectId } from "bson";
import React, { useState } from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	UIManager,
	StatusBar,
} from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { useVitals } from "../../providers/VitalProvider";

import AddButton from "../assets/components/AddButton";
import AppButton from "../assets/components/AppButton";
import { VitalModal } from "../assets/components/VitalModal";
import VitalItem, { vitalItemStyles } from "../assets/components/VitalItem";

import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";
import { Vital } from "../../schemas";

const vitalTypes = ["Numerical", "Categorical"];

export default function PatientScreen({ navigation, route }) {
	// Enable animation for drop-down graph/table
	if (Platform.OS === "android") {
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	const { patientId, patientName } = route.params;
	const { patient, createVital, closeRealm } = useVitals();

	const [vitalName, setVitalName] = useState("");
	const [vitalPeriodicity, setVitalPeriodicity] = useState<number>();
	const [vitalType, setVitalType] = useState("Numerical");
	const [vitalCategories, setVitalCategories] = useState([]);
	const [newVitalCategory, setNewVitalCategory] = useState("");

	const updateVitalCategory = (category, index) => {
		setVitalCategories((arr) => {
			arr[index] = category;
			return arr;
		});
		setNewVitalCategory("");
	};
	const deleteVitalCategory = (index) => {
		setVitalCategories((arr) => {
			arr.splice(index, 1);
			return arr;
		});
		setVitalCategories((arr) => [...arr]); //required to re render
		setNewVitalCategory("");
	};
	const appendVitalCategory = (category) => {
		setVitalCategories((arr) => [...arr, category]);
		setNewVitalCategory("");
	};

	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModal = () => setIsModalVisible(() => !isModalVisible);

	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	Platform.OS === "ios"
		? null
		: StatusBar.setBackgroundColor(colours.yellowBackground, true);

	if (!fontsLoaded) {
		return <View />;
	} else {
		return (
			<SafeAreaView
				style={[
					globalStyles.container,
					{ backgroundColor: colours.yellowBackground },
				]}
			>
				{/* Code for patient level header */}
				<View style={PatientScreenStyles.headerPatient}>
					<TouchableOpacity
						style={PatientScreenStyles.backButton}
						onPress={() => {
							navigation.goBack();
							closeRealm();
						}}
					>
						<Image
							style={PatientScreenStyles.backButtonImage}
							source={require("../assets/images/back.png")}
						/>
					</TouchableOpacity>

					<View
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={PatientScreenStyles.patientName}>
							{patientName}
						</Text>
					</View>

					<AppButton
						title="PDF"
						style={PatientScreenStyles.pdfButton}
						buttonTextStyle={PatientScreenStyles.pdfButtonText}
						onPress={() => console.log("Generate PDF")}
					/>
				</View>

				<ScrollView
					style={PatientScreenStyles.vitalsScrollView}
					contentContainerStyle={{
						alignSelf: "stretch",
						paddingBottom: "30%",
					}}
				>
					<View style={{ height: 10 }} />
					{patient
						? patient.vitals.map((vital: Vital, index: number) => (
								<VitalItem
									enabled={true}
									name={vital.name}
									periodicity={vital.periodicity}
									type={vital.type}
									data={vital.data}
									description={vital.description}
									timeElapsed={vital.timeElapsed}
									onPressInfo={() =>
										console.log(
											vital.name + " info pressed"
										)
									}
									onPressAdd={() =>
										console.log(
											vital.name + " add new reading"
										)
									}
									key={index}
								/>
						  ))
						: null}
				</ScrollView>

				{/* Code for add new vital button */}
				<AddButton onPress={handleModal} />

				{/* Code for add new vital info */}
				<VitalModal isVisible={isModalVisible}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<ScrollView
							style={{ top: Platform.OS == "ios" ? "5%" : 0 }}
							keyboardDismissMode="on-drag"
							keyboardShouldPersistTaps="never"
						>
							<VitalModal.Container>
								<VitalModal.Header />
								<VitalModal.Body>
									<View style={{ marginVertical: "3%" }} />
									<VitalItem
										enabled={false}
										name={vitalName}
										periodicity={vitalPeriodicity}
										type={vitalType}
										description={""}
										data={[]}
										timeElapsed={null}
										onPressAdd={null}
										onPressInfo={null}
									/>

									<View style={{ marginVertical: "3%" }} />

									<TextInput
										style={[
											globalStyles.credentialInput,
											{ width: "100%", margin: 0 },
										]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="Vital Name"
										autoCapitalize="words"
										autoCorrect={false}
										value={vitalName}
										onChangeText={setVitalName}
									/>
									<View style={{ marginVertical: "3%" }} />
									<TextInput
										style={[
											globalStyles.credentialInput,
											{ width: "100%", margin: 0 },
										]}
										clearButtonMode="while-editing"
										returnKeyType="next"
										textContentType="username"
										placeholder="Periodicity (minutes)"
										autoCorrect={false}
										keyboardType="numeric"
										value={
											vitalPeriodicity
												? vitalPeriodicity.toString()
												: null
										}
										onChangeText={(val) =>
											setVitalPeriodicity(parseInt(val))
										}
									/>
									<View style={{ marginVertical: "3%" }} />
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Type
									</Text>
									<SegmentedControl
										values={vitalTypes}
										onValueChange={setVitalType}
									/>

									<View style={{ marginVertical: "1%" }} />
									{vitalType == "Categorical" && (
										<View>
											{vitalCategories.map(
												(category, index) => (
													<View>
														<View>
															<TextInput
																style={[
																	globalStyles.credentialInput,
																	{
																		width: "100%",
																		margin: 0,
																	},
																]}
																clearButtonMode="never"
																returnKeyType="none"
																textContentType="username"
																placeholder="category"
																autoCapitalize="words"
																autoCorrect={
																	true
																}
																value={category}
																onChangeText={(
																	val
																) =>
																	updateVitalCategory(
																		val,
																		index
																	)
																}
															/>
															<AppButton
																title="x"
																style={
																	PatientScreenStyles.vitalCategoryButton
																}
																buttonTextStyle={
																	PatientScreenStyles.vitalCategoryButtonText
																}
																onPress={() =>
																	deleteVitalCategory(
																		index
																	)
																}
															/>
														</View>
														<View
															style={{
																marginVertical:
																	"1%",
															}}
														/>
													</View>
												)
											)}
											<View>
												<TextInput
													style={[
														globalStyles.credentialInput,
														{
															width: "100%",
															margin: 0,
														},
													]}
													clearButtonMode="while-editing"
													returnKeyType="next"
													textContentType="username"
													placeholder={
														"Category " +
														(vitalCategories.length +
															1)
													}
													autoCapitalize="words"
													autoCorrect={false}
													value={newVitalCategory}
													onChangeText={
														setNewVitalCategory
													}
												/>
												<AppButton
													title="+"
													style={
														PatientScreenStyles.vitalCategoryButton
													}
													buttonTextStyle={
														PatientScreenStyles.vitalCategoryButtonText
													}
													onPress={() =>
														appendVitalCategory(
															newVitalCategory
														)
													}
												/>
											</View>
										</View>
									)}
								</VitalModal.Body>
								<VitalModal.Footer>
									<AppButton
										title="Cancel"
										style={modalStyles.modalCancelButton}
										buttonTextStyle={
											modalStyles.modalButtonText
										}
										onPress={() => {
											setVitalName("");
											setVitalPeriodicity(0);
											setVitalType("");
											setVitalCategories([]);
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
											createVital(
												new ObjectId(patientId),
												vitalName,
												vitalPeriodicity,
												vitalType,
												"",
												vitalCategories
											);
											setVitalName("");
											setVitalPeriodicity(0);
											setVitalType(null);
											setVitalCategories([]);
											handleModal();
										}}
									/>
								</VitalModal.Footer>
							</VitalModal.Container>
						</ScrollView>
					</KeyboardAvoidingView>
				</VitalModal>
			</SafeAreaView>
		);
	}
}

const PatientScreenStyles = StyleSheet.create({
	backButton: {
		flexDirection: "column",
		justifyContent: "center",
		alignSelf: "flex-start",
		marginLeft: 10,
		marginRight: 20, // allows text to center properly, essentially makes it the same width as the PDF button
		width: 40,
		height: "100%",
	},
	backButtonImage: {
		width: "100%",
		height: "40%",
	},
	headerPatient: {
		flex: 0.1,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: colours.orange,
		width: "100%",
	},
	patientName: {
		flex: 1,
		textAlign: "center",
		height: "100%",
		fontSize: 25,
		fontWeight: "700",
	},
	pdfButton: {
		alignSelf: "center",
		justifyContent: "center",
		marginRight: 10,
		width: 60,
		backgroundColor: colours.lightBlueBackground,
		borderRadius: 15,
		color: colours.primary,
		borderColor: colours.primary,
		borderWidth: 1,
		padding: 6,
	},
	pdfButtonText: {
		fontSize: 20,
		fontWeight: "600",
		alignSelf: "center",
	},
	vitalsScrollView: {
		flex: 1,
		width: "100%",
		backgroundColor: colours.background,
		marginBottom: Platform.OS === "ios" ? "-10%" : 0,
	},
	vitalCategoryButton: {
		position: "absolute",
		height: "100%",
		width: undefined,
		aspectRatio: 1,
		borderRadius: 100,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		right: 0,
		top: "0%",
		elevation: 6,
	},
	vitalCategoryButtonText: {
		alignSelf: "center",
		fontSize: 30,
		fontWeight: "normal",
		top: "-5%",
		left: "2%",
	},
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
