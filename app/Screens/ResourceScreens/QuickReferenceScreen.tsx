import React from "react";
import {
	LayoutAnimation,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import colours from "../../assets/colours";
import globalStyles from "../../assets/stylesheet";
import { useState } from "react";

export default function QuickReferenceScreen() {
	const navigation = useNavigation();
	const [vitalsVisable, setVitalsVisable] = useState(false);
	const [acronymsVisable, setAcronymsVisable] = useState(false);
	const [pulseChangesVisable, setPulseChangesVisable] = useState(false);
	const [woundCleaningVisable, setWoundCleaningVisable] = useState(false);
	const [hypothermiaVisable, setHypothermiaVisable] = useState(false);
	const [heatVisable, setHeatVisable] = useState(false);

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
					quickReferenceStyles.header,
					{
						alignSelf: "center",
						top: 50,
						position: "absolute",
					},
				]}
			>
				Quick Reference
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
				<View style={globalStyles.separator} />

				{/*Vitals*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setVitalsVisable(!vitalsVisable);
						}}
					>
						{"Vitals"}
						<Icon
							name={
								vitalsVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{vitalsVisable && (
						<>
							<Text>{"Pulse:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"The pulse can be measured by applying pressure to " +
									"any point on the body that allows an artery to be " +
									"compressed near the surface of the skin. Usually " +
									"measured in beats per minute (BPM), a normal pulse " +
									"varies between 60-90 BPM.\n"}
							</Text>
							<Text>{"Respitory Rate: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"A persons respitory rate is the rate at which breathing occurs; " +
									"it is set and controlled by the respitory center of the brain and " +
									"is usually measured in breaths per minute. A typical resptiory rate is " +
									"between 12-20 breaths per minute and should not require significant effort.\n"}
							</Text>
							<Text>{"Blood Pressure: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Blood pressure is the pressure of circulating blood against the walls of " +
									"blood vessels. Most of this pressure results from the heart pumping blood " +
									"through the circulatory system. Blood pressure is represented by Systolic pressure " +
									"over Diastolic pressure. It can not easily be measured without the use of external tools.\n"}
							</Text>
							<Text>{"Skin Colour: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Skin colour is measured on a range of colours from red to white to blue. " +
									"Normal skin colour is dependant on the patients regular pigmentation, however, " +
									"bright red skin indicates too much blood flow to the surface, likely as a result " +
									"of heat exposure or fever. Blue skin indicates lack of blood flow and is often a sign of " +
									"hypoxia (lack of oxygen).\n"}
							</Text>
							<Text>{"Temperature: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Body temperature refers to the internal temperature of the human body. Body temperature should be " +
									"measured with external tools such as oral thermometers. In the absence of these tools, temperature " +
									"can be indicated by the surface temperature of the skin, however, this is not a definitive way to " +
									"measure body temperature as it can also indicate frost bite or a burn.\n"}
							</Text>
							<Text>{"AVPU: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"AVPU (Alert, Verbal, Pain, Unresponsive) is a discrete scale from (A) best to (U) worst.\n\n" +
									"Alert refers to the patient being fully awake, responsive to voice, and has mobile bodily " +
									"function, however, the patient may  still be confused or disoriented.\n\n" +
									"Verbal refers to the patient responding to interactions through one more communication " +
									"modes: eyes, voice or motor. Responses could involve opening eyes when prompted, grunting " +
									"lifting a limb when prompted.\n\n" +
									"Pain refers to the patient only being responsive to some form or pain stimulus such as a " +
									"sternal rub or squeezing the fingers. A concious patient would not require a pain stimulus.\n\n" +
									"Unresponsive also referred to as unconscious, is recorded when the patient does not provide " +
									"any voluntary eye, voice, or motor response to pain or voice prompts."}
							</Text>
						</>
					)}
				</View>

				<View style={quickReferenceStyles.separator} />

				{/*Acronyms*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setAcronymsVisable(!acronymsVisable);
						}}
					>
						{"Acronyms"}
						<Icon
							name={
								acronymsVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{acronymsVisable && (
						<>
							<Text>{"SAMPLE:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Signs/Symptoms\n" +
									"Allergies\n" +
									"Medications\n" +
									"Previous Injury\n" +
									"Last Meal/Drink\n" +
									"Events\n"}
							</Text>
							<Text>{"CMS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Circulation\n" + "Motion\n" + "Sensation\n"}
							</Text>
							<Text>{"OPQRST: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Onset\n" +
									"Provocation\n" +
									"Quality (dull, sharp)\n" +
									"Radiation\n" +
									"Severity (1-10)\n" +
									"Time\n"}
							</Text>
							<Text>{"DCAP-BTLS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Deformities\n" +
									"Contusions\n" +
									"Abrasions\n" +
									"Punctures/Penetrations\n" +
									"Burns/Bleeding\n" +
									"Tenderness\n" +
									"Lacerations\n" +
									"Swelling\n"}
							</Text>
						</>
					)}
				</View>

				<View style={quickReferenceStyles.separator} />

				{/*Pulse Changes*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setPulseChangesVisable(!pulseChangesVisable);
						}}
					>
						{"Common Causes of Pulse Changes"}
						<Icon
							name={
								pulseChangesVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{pulseChangesVisable && (
						<>
							<Text>{"Strong, Slow:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Normal sleep\n" +
									"- Simple fainting\n" +
									"- Early increased ICP\n" +
									"- Well-conditioned athlete\n" +
									"- Hypothyroid\n"}
							</Text>
							<Text>{"Weak, Slow: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Hypothermia\n" + "- Late increased ICP\n"}
							</Text>
							<Text>{"Strong, Fast: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Early heat stroke\n" +
									"- Fever\n" +
									"- Hyperthyroid\n" +
									"- Early shock\n" +
									"- ASR\n" +
									"- Strenuous physical activity\n"}
							</Text>
							<Text>{"Weak, Fast: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Overwhelming infection\n" +
									"- Late heat stroke\n" +
									"- Late shock\n" +
									"- Diabetic coma\n" +
									"- Some types of heart disease\n"}
							</Text>
							<Text>{"Irregular: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Sinus arrhythmia\n" + "- Heart disease\n"}
							</Text>
						</>
					)}
				</View>

				<View style={quickReferenceStyles.separator} />

				{/*Wound Cleaning*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setWoundCleaningVisable(!woundCleaningVisable);
						}}
					>
						{"Wound Cleaning"}
						<Icon
							name={
								woundCleaningVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{woundCleaningVisable && (
						<>
							<Text>{"Partial Thickness:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Soap and water wash\n" +
									"- Scrub to remove particles • 10% P.I.\n" +
									"- Keep moist\n" +
									"- Dress lightly\n"}
							</Text>
							<Text>
								{"Full Thickness (low to moderate risk): "}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Clean w/in 2 hours of bleeding end\n" +
									"- Clean around area with 10% P.I.\n" +
									"- Pressure flush with drinkable water in short bursts along axis\n" +
									"- Bring edges toward(not touching) each other and hold in place " +
									"with an occlusive dressing and/or steri-strips etc.\n"}
							</Text>
							<Text>{"Full Thickness (high risk): "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Clean as previous PLUS:\n" +
									"- Remove dead skin and tissue\n" +
									"- Remove foreign material\n" +
									"- Finish flushing process with 1% P.I.solution (strong tea or amber beer)\n" +
									"- Do not close in field\n" +
									"- Pack with thin layers of gauze soaked in 1% P.I. Remove and repack bid\n" +
									"- Dress with several layers of gauze. May place 10% P.I. between layers, " +
									"but not directly on wound\n" +
									"- Consider splinting if wound is over a joint\n"}
							</Text>
						</>
					)}
				</View>

				<View style={quickReferenceStyles.separator} />

				{/*Hypothermia*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setHypothermiaVisable(!hypothermiaVisable);
						}}
					>
						{"Hypothermia"}
						<Icon
							name={
								hypothermiaVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{hypothermiaVisable && (
						<>
							<Text>{"98.6° to 90°:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Patient will be A to A-, shivering, have increased urine output," +
									"decreased coordination and dexterity\n"}
							</Text>
							<Text>{"Treatment: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Active rewarming - give food (carbs first), liquids, " +
									"remove from elements, exercise, shelter, layers, add " +
									"external heat (heat packs or hot water bottles)\n"}
							</Text>
							<Text>{"<90°: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Patient will be V, P or U; shivering will stop; heart rate " +
									"and respirations will decrease; Patient may appear dead\n"}
							</Text>
							<Text>{"Treatment: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Passive rewarming - add insulating layers (hypowrap), " +
									"handle with care, no rapid warming or movement, no CPR " +
									"(AED may be used). PPVs may be given.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={quickReferenceStyles.separator} />

				{/*Heat Illnesses*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={quickReferenceStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setHeatVisable(!heatVisable);
						}}
					>
						{"Heat Related Illness"}
						<Icon
							name={
								heatVisable ? "chevron-down" : "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{heatVisable && (
						<>
							<Text>
								{
									"If heat is identified as a potential MOI and patient exhibits irrational behavior:"
								}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"1) ALWAYS COOL PATIENT FIRST\n" +
									"2) Assess hydration status\n" +
									"- If dehydration is established, hydrate with electrolyte solution\n" +
									"- If patient history includes copious H2O, give electrolytes only\n" +
									"3) Complete focused survey\n" +
									"4) Treat symptoms as indicated by survey; continue to support cooling mechanisms\n"}
							</Text>
							<Text>{"Heat exhaustion:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"A-(irritable), temp. 99°-104°, pale\n"}
							</Text>
							<Text>{"Heat stroke (early):"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"A- (irritable, combative), temp. >105°, pale if dehydrated, flushed if hydrated\n"
								}
							</Text>
							<Text>{"Heat stroke (late):"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"V,P or U, seizures, coma, death\n"}
							</Text>
							<Text>{"Electrolyte Sickness:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"A-, V, P or U; patient history of H2O but no food; can rapidly progress to increased ICP\n"
								}
							</Text>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const quickReferenceStyles = StyleSheet.create({
	airwayImage: {
		alignSelf: "center",
		height: undefined,
		width: "100%",
		aspectRatio: 4 / 5,
		resizeMode: "contain",
		padding: 20,
		marginHorizontal: 0,
	},
	header: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 25,
	},
	infoText: {
		alignSelf: "flex-start",
		fontWeight: "normal",
		fontSize: 12,
	},
	pulsePointsImage: {
		alignSelf: "center",
		height: undefined,
		width: "100%",
		aspectRatio: 3 / 5,
		resizeMode: "contain",
		padding: 20,
		marginHorizontal: 0,
	},
	separator: { marginVertical: "2.5%" },
	subHeader: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 20,
		color: "grey",
	},
});
