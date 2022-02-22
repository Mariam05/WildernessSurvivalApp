import React from "react";
import {
	LayoutAnimation,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

import colours from "../../assets/colours";
import globalStyles from "../../assets/stylesheet";
import { useState, useEffect } from "react";

{
	/* 
	This code is extremely SMELLY, but it works for now 
	TODO: move all text into a different file and retreive/ create 
	checkboxes by looping over text items...
	*/
}
export default function ChecklistScreen() {
	const navigation = useNavigation();
	const [personalVisable, setPersonalVisable] = useState(false);
	const [groupVisable, setGroupVisable] = useState(false);
	const [medicalItemsVisable, setMedicalItemsVisable] = useState(false);
	const [usefulItemsVisable, setUsefulItemsVisable] = useState(false);
	const [checked, setChecked] = useState([]);

	const isFocused = useIsFocused();
	useEffect(() => {
		const fetchChecked = async () => {
			try {
				const data = await AsyncStorage.getItem("checked");
				if (data != null) {
					setChecked(JSON.parse(data));
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (isFocused) fetchChecked().catch(console.error);

		return;
	}, [isFocused]);

	const handleCheck = async (checkIndex) => {
		var updatedList = [...checked];
		if (!checked.includes(checkIndex)) {
			updatedList = [...checked, checkIndex];
		} else {
			updatedList.splice(checked.indexOf(checkIndex), 1);
		}
		setChecked(updatedList);
		await AsyncStorage.setItem("checked", JSON.stringify(updatedList));
	};
	return (
		<SafeAreaView
			style={[
				globalStyles.container,
				{
					backgroundColor: colours.blue,
				},
			]}
		>
			<Text
				style={[
					checklistStyles.header,
					{
						alignSelf: "center",
						top: 50,
						position: "absolute",
					},
				]}
			>
				Checklists
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignSelf: "flex-start",
					marginHorizontal: "5%",
					marginTop: 10,
				}}
			>
				<Icon
					name="chevron-back"
					size={17}
					backgroundColor="transparent"
					color="black"
					onPress={() => navigation.goBack()}
				>
					Back
				</Icon>
			</View>

			<Text>In Progress...</Text>
			<ScrollView
				contentContainerStyle={{
					alignItems: "center",
					paddingBottom: 50,
				}}
				style={globalStyles.scrollView}
			>
				<View style={checklistStyles.separator} />
				{/*Personal First-aid Kit*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={checklistStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setPersonalVisable(!personalVisable);
						}}
					>
						{"Personal First-aid Kit"}
						<Icon
							name={
								personalVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{personalVisable && (
						<>
							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Adhesive bandages (6)"}
									isChecked={checked.includes(1)}
									onPress={async () => {
										await handleCheck(1);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Sterile gauze pads, 3x3-inch (2)"}
									isChecked={checked.includes(2)}
									onPress={async () => {
										await handleCheck(2);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Adhesive tape (1 small roll)"}
									isChecked={checked.includes(3)}
									onPress={async () => {
										await handleCheck(3);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Moleskin, 3x6-inch (1)"}
									isChecked={checked.includes(4)}
									onPress={async () => {
										await handleCheck(4);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Soap (1 small bar) or alcohol-based hand sanitizing gel (1 travel-sized bottle)"
									}
									isChecked={checked.includes(5)}
									onPress={async () => {
										await handleCheck(5);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Wound gel (1 small tube)"}
									isChecked={checked.includes(6)}
									onPress={async () => {
										await handleCheck(6);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Scissors (1 pair)"}
									isChecked={checked.includes(7)}
									onPress={async () => {
										await handleCheck(7);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Latex-free medical exam gloves (1 pair)"
									}
									isChecked={checked.includes(8)}
									onPress={async () => {
										await handleCheck(8);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Cardiopulmonary resuscitation (CPR) breathing barrier (1)"
									}
									isChecked={checked.includes(9)}
									onPress={async () => {
										await handleCheck(9);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Tweezers (1)"}
									isChecked={checked.includes(10)}
									onPress={async () => {
										await handleCheck(10);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Wilderness and Remote First Aid Report Form/Rescue Request and pencil"
									}
									isChecked={checked.includes(11)}
									onPress={async () => {
										await handleCheck(11);
									}}
								/>
							</View>
						</>
					)}
				</View>

				<View style={checklistStyles.separator} />

				{/*Group First-aid Kit*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={checklistStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setGroupVisable(!groupVisable);
						}}
					>
						{"Group First-aid Kit"}
						<Icon
							name={
								groupVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{groupVisable && (
						<>
							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Gauze bandage, 3-inch rolls (2)"}
									isChecked={checked.includes(12)}
									onPress={async () => {
										await handleCheck(12);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Self-adhesive bandage, 2-inch roll (1)"
									}
									isChecked={checked.includes(13)}
									onPress={async () => {
										await handleCheck(13);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Adhesive tape, 1-inch rolls (2)"}
									isChecked={checked.includes(14)}
									onPress={async () => {
										await handleCheck(14);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Alcohol pads (12)"}
									isChecked={checked.includes(15)}
									onPress={async () => {
										await handleCheck(15);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Povidone-iodine pads (12)"}
									isChecked={checked.includes(16)}
									onPress={async () => {
										await handleCheck(16);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Assorted adhesive bandages (1 box)"}
									isChecked={checked.includes(17)}
									onPress={async () => {
										await handleCheck(17);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Elastic bandages, 3-inch-wide (2)"}
									isChecked={checked.includes(18)}
									onPress={async () => {
										await handleCheck(18);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"sterile gauze pads, 4x4-inch (12)"}
									isChecked={checked.includes(19)}
									onPress={async () => {
										await handleCheck(19);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Moleskin, 3x6-inch (4)"}
									isChecked={checked.includes(20)}
									onPress={async () => {
										await handleCheck(20);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Gel pads for blisters and burns (2 packets)"
									}
									isChecked={checked.includes(21)}
									onPress={async () => {
										await handleCheck(21);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Wound gel (1 tube)"}
									isChecked={checked.includes(22)}
									onPress={async () => {
										await handleCheck(22);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Hydrocortisone cream 1 percent (1 tube)"
									}
									isChecked={checked.includes(23)}
									onPress={async () => {
										await handleCheck(23);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Triangular bandages (4)"}
									isChecked={checked.includes(24)}
									onPress={async () => {
										await handleCheck(24);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Soap (1 small bar) or alcohol-based hand sanitizing gel (1 travel-sized bottle)"
									}
									isChecked={checked.includes(25)}
									onPress={async () => {
										await handleCheck(25);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Scissors (1 pair)"}
									isChecked={checked.includes(26)}
									onPress={async () => {
										await handleCheck(26);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Tweezers (1 pair)"}
									isChecked={checked.includes(27)}
									onPress={async () => {
										await handleCheck(27);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Safety pins (12)"}
									isChecked={checked.includes(28)}
									onPress={async () => {
										await handleCheck(28);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Latex-free medical exam gloves (6 pairs)"
									}
									isChecked={checked.includes(29)}
									onPress={async () => {
										await handleCheck(29);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Protective goggles/safety glasses (1 pair)"
									}
									isChecked={checked.includes(30)}
									onPress={async () => {
										await handleCheck(30);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"CPR breathing barrier (1)"}
									isChecked={checked.includes(31)}
									onPress={async () => {
										await handleCheck(31);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Wilderness and Remote First Aid Report Form/Rescue Request and pencil"
									}
									isChecked={checked.includes(32)}
									onPress={async () => {
										await handleCheck(32);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Instant cold compress"}
									isChecked={checked.includes(33)}
									onPress={async () => {
										await handleCheck(33);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Space blanket"}
									isChecked={checked.includes(34)}
									onPress={async () => {
										await handleCheck(34);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Original size SAM® Splint"}
									isChecked={checked.includes(35)}
									onPress={async () => {
										await handleCheck(35);
									}}
								/>
							</View>
						</>
					)}
				</View>

				<View style={checklistStyles.separator} />

				{/*Additional Medical Items*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={checklistStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setMedicalItemsVisable(!medicalItemsVisable);
						}}
					>
						{"Additional Medical Items"}
						<Icon
							name={
								medicalItemsVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{medicalItemsVisable && (
						<>
							<Text>
								{"NOTE: The person should only take medication if he or she can swallow " +
									"and has no known contraindications. Individuals should read and follow " +
									"all label or health care provider instructions. Check regional " +
									"regulations regarding use of prescription and over-the-counter medications. " +
									"Aspirin and products containing aspirin should not be given to a child younger " +
									"than 19 years of age if he or she has a fever-causing illness."}
							</Text>
							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Denture adhesive"}
									isChecked={checked.includes(36)}
									onPress={async () => {
										await handleCheck(36);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Irrigation syringe"}
									isChecked={checked.includes(37)}
									onPress={async () => {
										await handleCheck(37);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Thermometer"}
									isChecked={checked.includes(38)}
									onPress={async () => {
										await handleCheck(38);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Commercial tourniquet"}
									isChecked={checked.includes(39)}
									onPress={async () => {
										await handleCheck(39);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Ibuprofen"}
									isChecked={checked.includes(40)}
									onPress={async () => {
										await handleCheck(40);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Chewable low-dose aspirin (81 mg each)"
									}
									isChecked={checked.includes(41)}
									onPress={async () => {
										await handleCheck(41);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Acetaminophen"}
									isChecked={checked.includes(42)}
									onPress={async () => {
										await handleCheck(42);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Oral antihistamine"}
									isChecked={checked.includes(43)}
									onPress={async () => {
										await handleCheck(43);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Properly labeled prescription medications for individuals (e.g., epiPen®, nitroglycerin, high-altitude drugs)"
									}
									isChecked={checked.includes(44)}
									onPress={async () => {
										await handleCheck(44);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Needle"}
									isChecked={checked.includes(45)}
									onPress={async () => {
										await handleCheck(45);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Alcohol (and/or vinegar)"}
									isChecked={checked.includes(46)}
									onPress={async () => {
										await handleCheck(46);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Tampons/pads"}
									isChecked={checked.includes(47)}
									onPress={async () => {
										await handleCheck(47);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Decongestant nasal spray"}
									isChecked={checked.includes(48)}
									onPress={async () => {
										await handleCheck(48);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Over-the-counter diarrhea medication"
									}
									isChecked={checked.includes(49)}
									onPress={async () => {
										await handleCheck(49);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Zinc oxide powder"}
									isChecked={checked.includes(50)}
									onPress={async () => {
										await handleCheck(50);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Chemical heat packs"}
									isChecked={checked.includes(51)}
									onPress={async () => {
										await handleCheck(51);
									}}
								/>
							</View>
						</>
					)}
				</View>

				<View style={checklistStyles.separator} />

				{/*Additional Useful Items*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={checklistStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setUsefulItemsVisable(!usefulItemsVisable);
						}}
					>
						{"Additional Useful Items"}
						<Icon
							name={
								usefulItemsVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{usefulItemsVisable && (
						<>
							<Text>
								{
									"NOTE: No piece of equipment is as valuable as the person who uses it."
								}
							</Text>
							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Full water bottle(s) (especially in waterless areas)"
									}
									isChecked={checked.includes(52)}
									onPress={async () => {
										await handleCheck(52);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Water purification and backup"}
									isChecked={checked.includes(53)}
									onPress={async () => {
										await handleCheck(53);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Ground insulation (e.g., a “sit-upon” camp mat)"
									}
									isChecked={checked.includes(54)}
									onPress={async () => {
										await handleCheck(54);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Shelter (could be a plastic tube shelter)"
									}
									isChecked={checked.includes(55)}
									onPress={async () => {
										await handleCheck(55);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"SAM® splint"}
									isChecked={checked.includes(56)}
									onPress={async () => {
										await handleCheck(56);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Plastic bags"}
									isChecked={checked.includes(57)}
									onPress={async () => {
										await handleCheck(57);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Emergency blanket"}
									isChecked={checked.includes(58)}
									onPress={async () => {
										await handleCheck(58);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Duct tape"}
									isChecked={checked.includes(59)}
									onPress={async () => {
										await handleCheck(59);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Signaling device (e.g., mirror, whistle)"
									}
									isChecked={checked.includes(60)}
									onPress={async () => {
										await handleCheck(60);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={"Identification/medical form"}
									isChecked={checked.includes(61)}
									onPress={async () => {
										await handleCheck(61);
									}}
								/>
							</View>

							<View style={checklistStyles.checkItem}>
								<BouncyCheckBox
									fillColor="grey"
									textStyle={checklistStyles.checkItemText}
									text={
										"Special environmental essentials (e.g., ice axe, cold weather sailing gear)"
									}
									isChecked={checked.includes(62)}
									onPress={async () => {
										await handleCheck(62);
									}}
								/>
							</View>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const checklistStyles = StyleSheet.create({
	header: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 25,
	},
	checkItem: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
		width: "90%",
	},
	checkItemText: { marginHorizontal: 5, color: "black" },
	separator: { marginVertical: "2.5%" },
});
