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

export default function AssessmentScreen() {
	const navigation = useNavigation();
	const [consciousnessVisable, setConsciousnessVisable] = useState(false);
	const [shockVisable, setShockVisable] = useState(false);
	const [asrVisable, setASRVisable] = useState(false);
	const [headInjuriesVisable, setHeadInjuriesVisable] = useState(false);
	const [spineVisable, setSpineVisable] = useState(false);

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
					assessmentStyles.header,
					{
						alignSelf: "center",
						top: 50,
						position: "absolute",
					},
				]}
			>
				Assessments
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

				{/*LOC*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={assessmentStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setConsciousnessVisable(!consciousnessVisable);
						}}
					>
						{"Levels of Consciousness (LOC)"}
						<Icon
							name={
								consciousnessVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{consciousnessVisable && (
						<>
							<Text>{"Reliable Patient:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Calm\n" +
									"Cooperative\n" +
									"Sober\n" +
									"Alert\n"}
							</Text>
							<Text>{"Causes of Abnormal Consciousness: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"(STOP EAT)\n" +
									"Sugar\n" +
									"Temperature\n" +
									"Oxygen\n" +
									"Pressure\n" +
									"Electricity\n" +
									"Altitude\n" +
									"Toxins\n"}
							</Text>
							<Text>{"AVPU: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"A+ Awake and Cooperative\n" +
									"A- Awake and lethargic or combative\n" +
									"V+ Responds with sound to verbal stimuli\n" +
									"V- Obeys simple commands with verbal stimuli\n" +
									"P+ Pulls away from source of pain\n" +
									"P- Moves toward source of pain\n" +
									"U Totally unresponsive\n"}
							</Text>
						</>
					)}
				</View>

				<View style={assessmentStyles.separator} />

				{/*Shock*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={assessmentStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setShockVisable(!shockVisable);
						}}
					>
						{"Shock Assessment"}
						<Icon
							name={
								shockVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{shockVisable && (
						<>
							<Text>{"Causes of shock:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Hypovolemic: Low fluid (Tank)\n" +
									"Cardiogenic: Heart problem (Pump)\n" +
									"Vascular: Vessel problem (Hose)\n"}
							</Text>
							<Text>{"Volume Shock (VS): "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Increased pulse\n" +
									"- Pale skin\n" +
									"- Increased Respiration Rate\n" +
									"- Normal AVPU\n"}
							</Text>
							<Text>{"Volume Shock late/decompensated: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Extremely increased pulse\n" +
									"- Pale skin\n" +
									"- Extremely increased Respiration Rate\n" +
									"- Decreased AVPU\n"}
							</Text>
							<Text>{"Treatment: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Stop visable bleeding, elevate legs, keep " +
									"warm, manage psychological factors, ventilate " +
									"if respirations are inadequate, give O2 and IV " +
									"fluids if available and appropriately trained.\n"}
							</Text>
							<Text>{"**Note: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"If a pulse drops and does not return to normal (60-90bpm) within " +
									"5-25 minutes, an elevated pulse is likely caused by VS, not Acute " +
									"Stress Reaction (ASR)\n"}
							</Text>
						</>
					)}
				</View>

				<View style={assessmentStyles.separator} />

				{/*ASR*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={assessmentStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setASRVisable(!asrVisable);
						}}
					>
						{"Acute Stress Reaction (ASR)"}
						<Icon
							name={
								asrVisable ? "chevron-down" : "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{asrVisable && (
						<>
							<Text>{"Sympathetic (fight or flight):"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Increased pulse\n" +
									"- Pale skin\n" +
									"- Increased respiration rate\n" +
									"- Normal AVPU\n" +
									"- Pain masking\n" +
									"- Looks like early VS\n"}
							</Text>
							<Text>{"Parasympathetic (rest and digest): "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Decreased pulse\n" +
									"- Pale skin\n" +
									"- Decreased Respiration Rate\n" +
									"- May feel light headed, dizzy, nauseous, faint, anxious\n"}
							</Text>
							<Text>{"Treatment: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"For either condidtion, calm patient and remove stressors as much as possible\n"
								}
							</Text>
							<Text>{"**Note: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"If a pulse drops and does not return to normal (60-90bpm) within " +
									"5-25 minutes, an elevated pulse is likely caused by VS, not Acute " +
									"Stress Reaction (ASR)\n"}
							</Text>
						</>
					)}
				</View>

				<View style={assessmentStyles.separator} />

				{/*Head Injuries*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={assessmentStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setHeadInjuriesVisable(!headInjuriesVisable);
						}}
					>
						{"Head Injuries"}
						<Icon
							name={
								headInjuriesVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{headInjuriesVisable && (
						<>
							<Text>{"Concussion:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"Patient must be awake, cooperative, improving and have amnesia\n"
								}
							</Text>
							<Text>{"Signs and Symptoms: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Patient is awake (now)\n" +
									"- Amnesia\n" +
									"- Can't have signs/symptoms of increased ICP\n" +
									"- Nausea/vomiting\n" +
									"- Headache\n" +
									"- Tired\n"}
							</Text>
							<Text>
								{"\nIncreased Intracranial Pressure (ICP): "}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>{""}</Text>
							<Text>{"Signs and Symptoms - early: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Patient is A- or lower (AVPU scale)\n" +
									"- C/O headache\n" +
									"- Persistent Vomiting\n" +
									"- Ataxia\n"}
							</Text>
							<Text>{"Signs and Symptoms - late: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Patient is VPU (AVPU scale)\n" +
									"- Vomiting persists\n" +
									"- Seizure\n" +
									"- Coma\n" +
									"- Cardiac/respitory arrest\n"}
							</Text>
						</>
					)}
				</View>

				<View style={assessmentStyles.separator} />

				{/*Spine Ruling Out Process*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={assessmentStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setSpineVisable(!spineVisable);
						}}
					>
						{"Spine Ruling Out Process (WFR or WEMT)"}
						<Icon
							name={
								spineVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{spineVisable && (
						<>
							<Text>{"Patient must:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Be reliable\n" +
									"- Report no pain when focused on spine\n" +
									"- Report no tenderness when spine palpated\n" +
									"- Have normal motor exam\n" +
									"- Have normal sensory exam\n" +
									'- Report no shooting, tingling or electric "pain" radiating from extremities\n'}
							</Text>
							<Text>{"Motor Exam: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Compare strength in both hands and feet. Have patient resist:\n" +
									"- finger squeeze; pushing down on hand\n" +
									'- push "gas pedal"; pull-up on foot\n'}
							</Text>
							<Text>{"Sensory Exam: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Compare patient's ability to distinguish pin prick " +
									"and soft touch on back of hand and shin\n" +
									"- use pin to prick\n" +
									"- use cloth for soft touch\n"}
							</Text>
							<Text>{"**Note: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"In cases where the spine can't be ruled out " +
									"but the injury can be localized to the lumbar area, " +
									"consult medical direction regarding need to continue " +
									"c-spine stabilization.\n"}
							</Text>
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const assessmentStyles = StyleSheet.create({
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
	separator: { marginVertical: "2.5%" },
	subHeader: {
		alignSelf: "flex-start",
		fontWeight: "bold",
		fontSize: 20,
		color: "grey",
	},
});
