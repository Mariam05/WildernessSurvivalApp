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
import ModalDropdown from "react-native-modal-dropdown";
import Moment from "moment";
import { useVitals } from "../../../providers/VitalProvider";
import { Reading, Vital } from "../../../schemas";

import colours from "../colours";
import globalStyles from "../stylesheet";
import AppButton from "./AppButton";

type ModalProps = {
	isVisible: boolean;
	children?: React.ReactNode;
	[x: string]: any;
};

const amPm = ["AM", "PM"];
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 60 }, (_, i) =>
	String(i).length < 2 ? "0" + String(i) : String(i)
);

export const ReadingModal = ({
	isVisible = false,
	handleReadingModal,
	vitalName,
	children,
	...props
}: ModalProps) => {
	const [hour, setHour] = useState(
		Moment().hour() == 12 ? String(12) : String(Moment().hour() % 12)
	);
	const [minute, setMinute] = useState(minutes[Moment().minutes()]);
	const [selectedAmPm, setSelectedAmPm] = useState(
		Moment().hour() < 12 ? "AM" : "PM"
	);
	const [timestamp, setTimestamp] = useState(
		Moment(`${hour} ${minute} ${selectedAmPm}`, `hh mm a`)
	);

	const [selectedCategory, setSelectedCategory] = useState("");
	const [enteredNumber, setEnteredNumber] = useState("");
	const [enteredNote, setEnteredNote] = useState("");

	const [vitalValueErrorMessage, setVitalValueErrorMessage] = useState("");
	const [timestampErrorMessage, setTimeStampErrorMessage] = useState("");

	const { patient, updateVital } = useVitals();
	var vital = patient
		? patient.vitals.find((v) => v.name === vitalName)
		: null;

	useEffect(() => {
		let currentTime = Moment();
		currentTime.hour(
			selectedAmPm === "AM"
				? Number(hour) % 12
				: Number(hour) == 12
				? 12
				: Number(hour) + 12
		);
		currentTime.minute(Number(minute));

		setTimestamp(currentTime);
		//console.log(currentTime.format());
	}, [hour, minute, selectedAmPm]);

	useEffect(() => {
		vital = patient
			? patient.vitals.find((v) => v.name === vitalName)
			: null;
	}, [patient]);

	useEffect(() => {
		setHour(
			Moment().hour() == 12 ? String(12) : String(Moment().hour() % 12)
		);
		setMinute(minutes[Moment().minutes()]);
		setSelectedAmPm(Moment().hour() < 12 ? "AM" : "PM");
		return () => {
			setHour(
				Moment().hour() == 12
					? String(12)
					: String(Moment().hour() % 12)
			);
			setMinute(minutes[Moment().minutes()]);
			setSelectedAmPm(Moment().hour() < 12 ? "AM" : "PM");
		};
	}, [isVisible]);

	const validateInput = (): boolean => {
		let error = true;

		if (
			(vital.type === "Numerical" && enteredNumber === "") ||
			(vital.type === "Categorical" && selectedCategory === "") ||
			(vital.type === "Special" && enteredNote === "")
		) {
			setVitalValueErrorMessage("Must enter a vital reading");
			error = false;
		}

		let currentTime = Moment();
		if (timestamp.isAfter(currentTime)) {
			// timestamp in the future
			setTimeStampErrorMessage("Timestamp cannot be in the future");
			error = false;
		}

		return error;
	};

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
					style={{
						top: Platform.OS == "ios" ? "5%" : 0,
					}}
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="never"
				>
					<ReadingModal.Container>
						<ReadingModal.Header
							vitalName={vital ? vital.name : null}
						/>
						<ReadingModal.Body>
							<View style={{ marginVertical: "3%" }} />

							{/* Categorical options */}
							{vital && vital.type == "Categorical" && (
								<>
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Options
									</Text>
									<ModalDropdown
										options={vital.categories} // this line causes an error for some reason
										onSelect={(index, value) => {
											setSelectedCategory(value);
											setVitalValueErrorMessage("");
										}}
										style={{
											backgroundColor:
												vitalValueErrorMessage
													? "tomato"
													: "white",
											borderWidth: 1,
											borderRadius: 10,
										}}
										textStyle={{
											fontSize: 20,
											width: "100%",
											padding: 15,
										}}
										dropdownStyle={{
											width: "80%",
											height:
												35 *
												(vital.categories.length + 1),
										}}
										dropdownTextStyle={{
											fontSize: 20,
										}}
									/>
									{vitalValueErrorMessage.length > 0 && (
										<Text style={modalStyles.errorMessage}>
											{vitalValueErrorMessage}
										</Text>
									)}
								</>
							)}

							{/* Numerical options */}
							{vital && vital.type == "Numerical" && (
								<>
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Value
									</Text>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<TextInput
											keyboardType="number-pad"
											returnKeyType="done"
											clearButtonMode="while-editing"
											style={[
												globalStyles.credentialInput,
												{
													flex: 90,
													width: "100%",
													backgroundColor:
														vitalValueErrorMessage
															? "tomato"
															: "white",
												},
											]}
											value={
												enteredNumber
													? enteredNumber
													: ""
											}
											onChangeText={(value) => {
												setVitalValueErrorMessage("");
												setEnteredNumber(value);
											}}
										/>
										<Text
											style={[
												modalStyles.attributeText,
												{ flex: 20, textAlign: "left" },
											]}
										>
											{vital.name === "Pulse"
												? "bpm"
												: vital.name === "Respiration"
												? "bpm"
												: vital.name === "Temperature"
												? "°C"
												: ""}
										</Text>
									</View>
									{vitalValueErrorMessage.length > 0 && (
										<Text style={modalStyles.errorMessage}>
											{vitalValueErrorMessage}
										</Text>
									)}
									{(vital.name === "Pulse" ||
										vital.name === "Respiration") && (
										<>
											<View
												style={{ marginVertical: "3%" }}
											/>
											<AppButton
												onPress={() =>
													console.log(
														"Need to link this to a screen"
													)
												}
												title="Use Recording Tool"
												style={
													modalStyles.readingToolButton
												}
												buttonTextStyle={
													modalStyles.readingToolButtonText
												}
											/>
										</>
									)}
								</>
							)}

							{/* General Notes options */}
							{vital && vital.type == "Special" && (
								<>
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Note
									</Text>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<TextInput
											keyboardType="default"
											returnKeyType="next"
											multiline={true}
											autoCapitalize="sentences"
											autoCorrect={true}
											style={[
												globalStyles.credentialInput,
												{
													width: "100%",
													height: 200,
													paddingTop: 15,
													backgroundColor:
														vitalValueErrorMessage
															? "tomato"
															: "white",
												},
											]}
											value={
												enteredNote ? enteredNote : ""
											}
											onChangeText={(value) => {
												setVitalValueErrorMessage("");
												setEnteredNote(value);
											}}
										/>
									</View>
									{vitalValueErrorMessage.length > 0 && (
										<Text style={modalStyles.errorMessage}>
											{vitalValueErrorMessage}
										</Text>
									)}
								</>
							)}

							<View style={{ marginVertical: "3%" }} />

							{/* Time selector */}
							<View style={{ flexDirection: "row" }}>
								<Text style={modalStyles.modalSubHeadingText}>
									Time
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<ModalDropdown
									options={hours}
									defaultValue={hour}
									defaultIndex={hours.indexOf(hour)}
									onSelect={(index, value) => {
										setHour(value);
										setTimeStampErrorMessage("");
									}}
									style={{
										flex: 15,
										backgroundColor: timestampErrorMessage
											? "tomato"
											: "white",
										borderWidth: 1,
										borderRadius: 10,
									}}
									textStyle={{
										fontSize: 20,
										width: "100%",
										padding: 15,
									}}
									dropdownStyle={{
										width: "25%",
										height: 35 * 8,
									}}
									dropdownTextStyle={{
										fontSize: 20,
									}}
								/>
								<Text style={modalStyles.attributeText}>
									{":"}
								</Text>
								<ModalDropdown
									options={minutes}
									defaultValue={minute}
									defaultIndex={minutes.indexOf(
										String(minute)
									)}
									onSelect={(index, value) => {
										setMinute(value);
										setTimeStampErrorMessage("");
									}}
									style={{
										flex: 15,
										backgroundColor: timestampErrorMessage
											? "tomato"
											: "white",
										borderWidth: 1,
										borderRadius: 10,
									}}
									textStyle={{
										fontSize: 20,
										width: "100%",
										padding: 15,
									}}
									dropdownStyle={{
										width: "25%",
										height: 35 * 8,
									}}
									dropdownTextStyle={{
										fontSize: 20,
									}}
								/>
								<ModalDropdown
									options={amPm}
									defaultValue={selectedAmPm}
									defaultIndex={amPm.indexOf(selectedAmPm)}
									onSelect={(index, value) => {
										setSelectedAmPm(value);
										setTimeStampErrorMessage("");
									}}
									style={{
										flex: 10,
										marginLeft: 5,
										backgroundColor: timestampErrorMessage
											? "tomato"
											: "white",
										borderWidth: 1,
										borderRadius: 10,
									}}
									textStyle={{
										fontSize: 20,
										width: "100%",
										padding: 15,
									}}
									dropdownStyle={{
										width: "25%",
										height: 100,
									}}
									dropdownTextStyle={{
										fontSize: 20,
									}}
								/>
							</View>
							{timestampErrorMessage.length > 0 && (
								<Text style={modalStyles.errorMessage}>
									{timestampErrorMessage}
								</Text>
							)}
							<View style={{ marginVertical: "3%" }} />
						</ReadingModal.Body>
						<ReadingModal.Footer>
							<AppButton
								title="Cancel"
								style={modalStyles.modalCancelButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									handleReadingModal();
									setSelectedCategory("");
									setEnteredNumber("");
									setEnteredNote("");
									setVitalValueErrorMessage("");
									setTimeStampErrorMessage("");
								}}
							/>
							<AppButton
								title="Submit"
								style={modalStyles.modalSubmitButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									if (!validateInput()) return;
									handleReadingModal();
									setSelectedCategory("");
									setEnteredNumber("");
									setEnteredNote("");
									setVitalValueErrorMessage("");
									updateVital(
										vital.name,
										new Reading({
											timestamp: String(
												timestamp.valueOf()
											),
											value:
												vital.type === "Numerical"
													? enteredNumber
													: vital.type ==
													  "Categorical"
													? selectedCategory
													: enteredNote,
										})
									);
									console.log(timestamp.format());
								}}
							/>
						</ReadingModal.Footer>
					</ReadingModal.Container>
				</ScrollView>
			</KeyboardAvoidingView>
		</RNModal>
	);
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
	<View style={styles.modalContainer}>{children}</View>
);

const ModalHeader = ({ vitalName }) => (
	<View style={styles.modalHeader}>
		<Text style={styles.modalHeaderText}>New {vitalName} Reading</Text>
	</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalBody}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalFooter}>{children}</View>
);

ReadingModal.Header = ModalHeader;
ReadingModal.Container = ModalContainer;
ReadingModal.Body = ModalBody;
ReadingModal.Footer = ModalFooter;

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
		marginBottom: 10,
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
	attributeText: {
		flex: 1,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	errorMessage: {
		color: "red",
		left: "5%",
		width: "80%",
		fontSize: 15,
		fontWeight: "400",
		marginTop: 0,
	},
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
	readingToolButton: {
		alignSelf: "center",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "center",
		height: "10%",
		width: "75%",
		maxWidth: 350,
		margin: 5,
		backgroundColor: colours.yellowBackground,
		borderWidth: 0,
		borderRadius: 25,
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 4,
	},
	readingToolButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
});
