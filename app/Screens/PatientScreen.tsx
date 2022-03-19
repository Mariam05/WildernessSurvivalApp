import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import React, { useState } from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	UIManager,
	StatusBar,
	Dimensions,
	Alert,
} from "react-native";
import { MenuView } from "@react-native-menu/menu";

import AddButton from "../assets/components/AddButton";
import { VitalModal } from "../assets/components/VitalModal";

import { VitalItem, Data, RenderChart} from "../assets/components/VitalItem";


import { PatientModal } from "../assets/components/PatientModal";
import { ReadingModal } from "../assets/components/ReadingModal";
import { VitalInfoModal } from "../assets/components/VitalInfoModal";

import globalStyles from "../assets/stylesheet";
import colours from "../assets/colours";
import { Vital } from "../../schemas";
import { createPDF } from "../pdf-generator";


const vitalTypes = ["Numerical", "Categorical"];
import { usePatients } from "../../providers/PatientProvider";
import { useVitals } from "../../providers/VitalProvider";

export default function PatientScreen({ navigation, route }) {
	// Enable animation for drop-down graph/table
	if (Platform.OS === "android") {
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}


	/* For displaying full screen chart */
	const [chartType, setChartType] = useState("");
	const [chartVitalData, setChartVitalData] = useState("");
	const [chartVitalCategories, setChartVitalCategories] = useState("");

	const [isChartModalVisible, setIsChartModalVisible] = useState(false);
	const handleChartModal = ({ type, data, categories }) => {
		setChartVitalCategories(categories);
		setChartVitalData(data);
		setChartType(type);
		return setIsChartModalVisible(() => !isChartModalVisible)
	};

	/* For displaying specific vitals on chart */
	const [displayVitals, setDisplayVitals] = useState([]);
	const toggleVital = (name) => {
		setDisplayVitals((arr) => {
			const array = arr.includes(name)
				? arr.filter(i => i !== name) // remove item
				: [...arr, name];
			return array;
		})
	}

	/* For toggling between the two views */
	const [alernateView, setAlternateView] = useState(false);
	const toggleView = () => {
		setAlternateView(() => !alernateView);
    }

	const { patient, closeRealm } = useVitals();
	const { deletePatient } = usePatients();

	const [isVitalModalVisible, setIsVitalModalVisible] = useState(false);
	const handleVitalModal = () => {
		setIsVitalModalVisible(() => !isVitalModalVisible);
	};
	const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
	const handlePatientModal = () => {
		setIsPatientModalVisible(() => !isPatientModalVisible);
	};
	const [isReadingModalVisible, setIsReadingModalVisible] = useState(false);
	const handleReadingModal = () => {
		setIsReadingModalVisible(() => !isReadingModalVisible);
	};

	const [vitalDescription, setVitalDescription] = useState("");
	const [isVitalInformationModalVisible, setIsVitalInformationModalVisible] = useState(false);
	const handleVitalInfoModal = () => {
		setIsVitalInformationModalVisible(() => !isVitalInformationModalVisible);
    }


	const [selectedVital, setSelectedVital] = useState("");

	

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
				{!isChartModalVisible && <View style={PatientScreenStyles.headerPatient}>
					<TouchableOpacity
						style={PatientScreenStyles.backButton}
						onPress={() => {
							navigation.navigate("Landing");
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
							{patient ? patient.name : ""}
						</Text>
					</View>
					<MenuView
						title="Patient Options"
						onPressAction={({ nativeEvent }) => {
							if (nativeEvent.event == "edit") {
								handlePatientModal();
								return;
							} else if (nativeEvent.event == "pdf") {
								console.log("Generate PDF");
								createPDF(patient);
								return;
							} else if (nativeEvent.event == "deletePatient") {
								Alert.alert(
									"Delete " + patient.name + "?",
									"Are you sure?",
									[
										{
											text: "Delete",
											style: "destructive",
											onPress: () => {
												console.log(
													"Deleting " + patient.name
												);
												navigation.goBack();
												deletePatient(patient);
											},
										},
										{ text: "Cancel", style: "cancel" },
									]
								);
								return;
							} else if (nativeEvent.event == "toggleView") {
								toggleView();
								return;
							}

							console.warn(
								"Event not recognized " +
								JSON.stringify(nativeEvent)
							);
						}}
						actions={[
							{
								id: "toggleView",
								title: "Toggle View",
								titleColor: colours.primary,
								image: Platform.select({
									ios: "tray",
									android: "ic_menu_agenda",
								}),
								imageColor: colours.primary,

							},
							{
								id: "edit",
								title: "Edit Patient",
								titleColor: colours.primary,
								image: Platform.select({
									ios: "square.and.pencil",
									android: "ic_menu_edit",
								}),
								imageColor: colours.primary,
							},
							{
								id: "pdf",
								title: "Export to PDF",
								titleColor: colours.primary,
								image: Platform.select({
									ios: "square.and.arrow.up",
									android: "ic_menu_share",
								}),
								imageColor: colours.primary,
							},
							{
								id: "deletePatient",
								title: "Delete Patient",
								attributes: {
									destructive: true,
								},
								image: Platform.select({
									ios: "trash",
									android: "ic_menu_delete",
								}),
							},

						]}
					>
						<View style={PatientScreenStyles.infoButton}>
							<Text style={PatientScreenStyles.pdfButtonText}>
								i
							</Text>
						</View>
					</MenuView>
				</View>}

				{patient ?
					(alernateView ?
						<View
							style={PatientScreenStyles.vitalsScrollView}
						>
							<View style={{ height: 10 }} />

							<RenderChart initial_data={patient.vitals} fullscreen={false} displayVitals={displayVitals} />
							<View style={{
								height: 10, borderBottomColor: "black", borderBottomWidth: 3, width: "80%", left: "10%" }} />
							<ScrollView
								style={PatientScreenStyles.vitalsScrollView}
								contentContainerStyle={{
									alignSelf: "stretch",
									paddingBottom: "30%",
								}}
							>
								<View style={{ height: 10 }} />
								{patient.vitals.map((vital: Vital, index: number) => (
									<VitalItem
										isToggled={displayVitals.includes(vital.name)}
										name={vital.name}
										periodicity={vital.periodicity}
										type={vital.type}
										categories={vital.categories}
										data={vital.data}
										description={vital.description}
										timeElapsed={vital.timeElapsed}
										index={index}
										click_enabled={true}
										onPress={vital.data.length > 0 && (vital.type == "Numerical" || vital.type=="Categorical") ? () => toggleVital(vital.name) : null}
										onPressInfo={() => {
											setVitalDescription(vital.description);
											handleVitalInfoModal();
										}}
										onPressAdd={() => {
											setSelectedVital(vital.name);
											handleReadingModal();
										}}
										key={index}
										onChartLongPress={null}
									/>
								))}
							</ScrollView>
						</View>

						:
						<ScrollView
							style={PatientScreenStyles.vitalsScrollView}
							contentContainerStyle={{
								alignSelf: "stretch",
								paddingBottom: "30%",
							}}
						>
							<View style={{ height: 10 }} />
							{patient.vitals.map((vital: Vital, index: number) => (
								<VitalItem
									isToggled={false}
									click_enabled={true}
									name={vital.name}
									periodicity={vital.periodicity}
									type={vital.type}
									categories={vital.categories}
									data={vital.data}
									description={vital.description}
									timeElapsed={vital.timeElapsed}
									onPress={null}
									index={index}
									onPressInfo={() => {
										setVitalDescription(vital.description);
										handleVitalInfoModal();
									}}
									onPressAdd={() => {
										setSelectedVital(vital.name);
										handleReadingModal();
									}}
									key={index}
									onChartLongPress={() => handleChartModal({ type: vital.type, data: vital.data, categories: vital.categories })}
								/>
							))}
						</ScrollView>
					) : null
				}

				{/* Code for display chart full screen */}
				{isChartModalVisible &&
					<Data
						type={chartType}
						data={chartVitalData}
						categories={chartVitalCategories}
						fullscreen={true} onChartLongPress={() => handleChartModal({ type: null, data: null, categories: null })}
					/>
				}


				{/* Code for add new vital button */}
				<AddButton onPress={handleVitalModal} />

				{/* Code for add new vital */}
				<VitalModal
					isVisible={isVitalModalVisible}
					handleVitalModal={handleVitalModal}
				/>


				{/* Code for editing patient info */}
				<PatientModal
					isVisible={isPatientModalVisible}
					handlePatientModal={handlePatientModal}
				/>


				{/* Code for vital info */}
				<VitalInfoModal
					isVisible={isVitalInformationModalVisible}
					handleVitalInfoModal={handleVitalInfoModal}
					vitalDescription={vitalDescription}
				/>


				{/* Code for adding vital reading */}
				<ReadingModal
					isVisible={isReadingModalVisible}
					handleReadingModal={handleReadingModal}
					vitalName={selectedVital}
				/>

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
	infoButton: {
		alignSelf: "center",
		justifyContent: "center",
		marginRight: 20,
		width: 40,
		height: undefined,
		aspectRatio: 1,
		backgroundColor: colours.lightBlueBackground,
		borderRadius: 50,
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
});
