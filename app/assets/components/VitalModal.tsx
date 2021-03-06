import { ObjectId } from "bson";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	TextInput,
} from "react-native";
import RNModal from "react-native-modal";
import { useVitals } from "../../../providers/VitalProvider";

import colours from "../colours";
import globalStyles from "../stylesheet";
import AppButton from "./AppButton";
import { VitalItem } from "./VitalItem";

type ModalProps = {
	isVisible: boolean;
	children?: React.ReactNode;
	[x: string]: any;
};

const vitalTypes = ["Numerical", "Categorical"];

export const VitalModal = ({
	isVisible = false,
	handleVitalModal,
	children,
	...props
}: ModalProps) => {
	const { patient, createVital } = useVitals();

	const [vitalName, setVitalName] = useState("");
	const [vitalPeriodicity, setVitalPeriodicity] = useState<number>();
	const [vitalType, setVitalType] = useState(vitalTypes[0]);
	const [vitalCategories, setVitalCategories] = useState([]);
	const [newVitalCategory, setNewVitalCategory] = useState("");

	const [vitalNameErrorMessage, setVitalNameErrorMessage] = useState("");
	const [categoriesErrorMessage, setCategoriesErrorMessage] = useState("");

	const updateVitalCategory = (category, index) => {
		setVitalCategories((arr) => {
			let array = [...arr];
			array[index] = category;
			return array;
		});
	};
	const deleteVitalCategory = (index) => {
		setVitalCategories((arr) => {
			arr.splice(index, 1);
			return arr;
		});
		setVitalCategories((arr) => [...arr]); //required to re render
	};
	const appendVitalCategory = (category) => {
		setVitalCategories((arr) => [...arr, category]);
		setNewVitalCategory("");
	};

	const validateInput = (): boolean => {
		let error = false;

		if (vitalName === "") {
			setVitalNameErrorMessage("Must enter a vital name");
			error = true;
		} else {
			patient.vitals.forEach((vital) => {
				if (vital.name.toLowerCase() === vitalName.toLowerCase()) {
					setVitalNameErrorMessage("Must enter a unique vital name");
					error = true;
				}
			});
		}

		if (vitalType === vitalTypes[1] && vitalCategories.length <= 1) {
			console.log("Categories: " + vitalCategories);
			setCategoriesErrorMessage("Must enter at least 2 categories");
			error = true;
		} else if (vitalType === vitalTypes[1]) {
			vitalCategories.forEach((cat) => {
				if (cat === "") {
					setCategoriesErrorMessage(
						"Every category must have a name"
					);
					error = true;
				}
			});
		} else {
			setCategoriesErrorMessage("");
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
				behavior={Platform.OS === "ios" ? "position" : "height"}
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
								click_enabled={false}
								name={vitalName}
								periodicity={vitalPeriodicity}
								type={vitalType}
								description={""}
								data={[]}
								index={0}
								categories={[]}
								onPress={null}
								timeElapsed={null}
								onPressAdd={null}
								onPressInfo={null}
								onChartLongPress={null}
								isToggled={null}
							/>

							<View style={{ marginVertical: "3%" }} />

							<TextInput
								style={[
									globalStyles.credentialInput,
									{
										width: "100%",
										margin: 0,
										backgroundColor: vitalNameErrorMessage
											? "tomato"
											: "white",
									},
								]}
								clearButtonMode="while-editing"
								returnKeyType="next"
								textContentType="username"
								placeholder="Vital Name"
								autoCapitalize="words"
								autoCorrect={false}
								value={vitalName}
								onChangeText={(text) => {
									setVitalNameErrorMessage("");
									setVitalName(text);
								}}
							/>
							{vitalNameErrorMessage.length > 0 && (
								<Text style={modalStyles.errorMessage}>
									{vitalNameErrorMessage}
								</Text>
							)}
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
							<Text style={modalStyles.modalSubHeadingText}>
								Type
							</Text>
							{categoriesErrorMessage.length > 0 && (
								<Text style={modalStyles.errorMessage}>
									{categoriesErrorMessage}
								</Text>
							)}
							<SegmentedControl
								selectedIndex={vitalTypes.indexOf(vitalType)}
								values={vitalTypes}
								onValueChange={setVitalType}
							/>

							<View style={{ marginVertical: "1%" }} />
							{vitalType == "Categorical" && (
								<View>
									<Text
										style={modalStyles.modalSubHeadingText}
									>
										Enter categories from "lowest" to
										"highest"
									</Text>
									{vitalCategories.map((category, index) => (
										<View key={index}>
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
													placeholder="Category"
													autoCapitalize="words"
													autoCorrect={true}
													value={category}
													onChangeText={(val) =>
														updateVitalCategory(
															val,
															index
														)
													}
												/>
												<AppButton
													title="x"
													style={
														modalStyles.vitalCategoryButton
													}
													buttonTextStyle={
														modalStyles.vitalCategoryButtonText
													}
													onPress={() => {
														deleteVitalCategory(
															index
														);
														setCategoriesErrorMessage(
															""
														);
													}}
												/>
											</View>
											<View
												style={{
													marginVertical: "1%",
												}}
											/>
										</View>
									))}
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
												(vitalCategories.length + 1)
											}
											autoCapitalize="words"
											autoCorrect={false}
											value={newVitalCategory}
											onChangeText={setNewVitalCategory}
										/>
										<AppButton
											title="+"
											style={
												modalStyles.vitalCategoryButton
											}
											buttonTextStyle={
												modalStyles.vitalCategoryButtonText
											}
											onPress={() => {
												appendVitalCategory(
													newVitalCategory
												);
												setCategoriesErrorMessage("");
											}}
										/>
									</View>
								</View>
							)}
						</VitalModal.Body>
						<VitalModal.Footer>
							<AppButton
								title="Cancel"
								style={modalStyles.modalCancelButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									setVitalName("");
									setVitalPeriodicity(0);
									setVitalType(vitalTypes[0]);
									setVitalCategories([]);
									handleVitalModal();
									setVitalNameErrorMessage("");
									setCategoriesErrorMessage("");
									setNewVitalCategory("");
								}}
							/>
							<AppButton
								title="Submit"
								style={modalStyles.modalSubmitButton}
								buttonTextStyle={modalStyles.modalButtonText}
								onPress={() => {
									console.log("creating vital");

									if (validateInput()) {
										console.log("invalid input");
										return;
									}
									createVital(
										new ObjectId(patient._id),
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
									handleVitalModal();
									setVitalNameErrorMessage("");
									setCategoriesErrorMessage("");
									setNewVitalCategory("");
								}}
							/>
						</VitalModal.Footer>
					</VitalModal.Container>
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
		<Text style={styles.modalHeaderText}>Create a New Vital</Text>
	</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalBody}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.modalFooter}>{children}</View>
);

VitalModal.Header = ModalHeader;
VitalModal.Container = ModalContainer;
VitalModal.Body = ModalBody;
VitalModal.Footer = ModalFooter;

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
