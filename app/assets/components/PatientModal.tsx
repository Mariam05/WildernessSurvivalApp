import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { createRef, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TextInput,
} from "react-native";
import RNModal from "react-native-modal";
import { usePatients } from "../../../providers/PatientProvider";
import { useVitals } from "../../../providers/VitalProvider";

import colours from "../colours";
import globalStyles from "../stylesheet";
import AppButton from "./AppButton";
import PatientItem from "./PatientItem";

type ModalProps = {
	isVisible: boolean;
	children?: React.ReactNode;
	[x: string]: any;
};

const ages = ["?", "<18", "18-30", "30-50", "50-70", "70+"];
const sexes = ["?", "Male", "Female", "Other"];

export const PatientModal = ({
	isVisible = false,
	handlePatientModal,
	children,
	...props
}: ModalProps) => {
	const [patientFN, setPatientFN] = useState(props.firstName);
	const [patientLN, setPatientLN] = useState(props.lastName);
	const [patientAge, setPatientAge] = useState(props.age);
	const [patientSex, setPatientSex] = useState(props.sex);
	const lastNameRef = createRef<TextInput>();

	const { updatePatient } = usePatients();
	const { patient } = useVitals();

	useEffect(() => {
		if (patient) {
			setPatientFN(patient.name.split(" ")[0]);
			setPatientLN(patient.name.split(" ")[1]);
			setPatientAge(patient.age);
			setPatientSex(patient.sex);
		}
	}, [patient]);

	return (
		<RNModal
			isVisible={isVisible}
			animationInTiming={1000}
			animationOutTiming={1000}
			backdropTransitionInTiming={800}
			backdropTransitionOutTiming={800}
			{...props}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					style={{ top: Platform.OS == "ios" ? "5%" : 0 }}
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="never"
				>
					<PatientModal.Container>
						<PatientModal.Body>
							<View style={{ marginVertical: "3%" }} />
							<PatientItem
								enabled={false}
								onPress={null}
								infoPress={null}
								name={patientFN + " " + patientLN}
								age={patientAge}
								sex={patientSex}
								timestamp={Date.now()}
								style={{ width: "90%" }}
							/>
							<View style={{ marginVertical: "3%" }} />
							<Text style={modalStyles.modalSubHeadingText}>
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
								value={patientFN}
								onChangeText={setPatientFN}
								onSubmitEditing={() => {
									lastNameRef.current.focus();
								}}
							/>
							<View style={{ marginVertical: "3%" }} />
							<TextInput
								ref={lastNameRef}
								style={[
									globalStyles.credentialInput,
									{ width: "100%", margin: 0 },
								]}
								clearButtonMode="while-editing"
								returnKeyType="next"
								textContentType="username"
								placeholder="Last Name"
								autoCapitalize="words"
								autoCorrect={false}
								value={patientLN}
								onChangeText={setPatientLN}
							/>
							<View style={{ marginVertical: "3%" }} />
							<Text style={modalStyles.modalSubHeadingText}>
								Age
							</Text>
							<SegmentedControl
								values={ages}
								selectedIndex={ages.indexOf(patientAge)}
								onValueChange={setPatientAge}
							/>
							<View style={{ marginVertical: "3%" }} />
							<Text style={modalStyles.modalSubHeadingText}>
								Sex
							</Text>
							<SegmentedControl
								values={sexes}
								selectedIndex={sexes.indexOf(patientSex)}
								onValueChange={setPatientSex}
							/>
						</PatientModal.Body>
						<PatientModal.Footer>
							<AppButton
								title="Cancel"
								style={modalStyles.modalCancelButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									handlePatientModal();
								}}
							/>
							<AppButton
								title="Submit"
								style={modalStyles.modalSubmitButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									updatePatient(
										patient._id,
										patientFN + " " + patientLN,
										patientAge,
										patientSex
									);
									handlePatientModal();
								}}
							/>
						</PatientModal.Footer>
					</PatientModal.Container>
				</ScrollView>
			</KeyboardAvoidingView>
		</RNModal>
	);
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
	<View style={styles.modalContainer}>{children}</View>
);

const ModalHeader = () => (
	<View style={styles.modalHeader}>
		<Text style={styles.modalHeaderText}>Create a New Patient</Text>
	</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalBody}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalFooter}>{children}</View>
);

PatientModal.Header = ModalHeader;
PatientModal.Container = ModalContainer;
PatientModal.Body = ModalBody;
PatientModal.Footer = ModalFooter;

const styles = StyleSheet.create({
	modalBody: {
		justifyContent: "center",
		paddingHorizontal: 15,
		minHeight: 10,
	},
	modalContainer: {
		backgroundColor: colours.pinkBackground,
		borderRadius: 25,
		borderColor: "#000",
		height: "100%",
	},
	modalFooter: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		flexDirection: "row",
	},
	modalHeader: {
		alignItems: "center",
		justifyContent: "center",
	},
	modalHeaderText: {
		paddingTop: 10,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "500",
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
