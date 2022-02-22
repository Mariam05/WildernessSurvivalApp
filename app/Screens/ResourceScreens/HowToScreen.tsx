import React from "react";
import {
	Image,
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
	const [woundCleaningVisable, setWoundCleaningVisable] = useState(false);
	const [glovesVisable, setGlovesVisable] = useState(false);
	const [checkAdultVisable, setCheckAdultVisable] = useState(false);
	const [checkChildVisable, setCheckChildVisable] = useState(false);
	const [cprVisable, setCPRVisable] = useState(false);
	const [aedVisable, setAEDVisable] = useState(false);
	const [chokingVisable, setChokingVisable] = useState(false);

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
					howToStyles.header,
					{
						alignSelf: "center",
						top: 50,
						position: "absolute",
					},
				]}
			>
				How to...
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
				<View style={howToStyles.separator} />

				{/*Glove Removal*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setGlovesVisable(!glovesVisable);
						}}
					>
						{"Glove Removal"}
						<Icon
							name={
								glovesVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{glovesVisable && (
						<>
							<Text>{"1. PINCH GLOVE:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Pinch the palm side of one glove near the wrist. " +
									"carefully pull the glove off so that it is inside out.\n"}
							</Text>
							<Image
								source={require("../../assets/images/gloveRemoval1.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"2. SLIP TWO FINGERS UNDER GLOVE: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Hold the glove in the palm of the remaining gloved " +
									"hand. slip two fingers under the glove at the wrist of " +
									"the remaining gloved hand.\n"}
							</Text>
							<Image
								source={require("../../assets/images/gloveRemoval2.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"3. PULL GLOVE OFF: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Pull the glove until it comes off, " +
									"inside out, so that the first glove ends up " +
									"inside the glove just removed.\n"}
							</Text>
							<Image
								source={require("../../assets/images/gloveRemoval3.png")}
								style={howToStyles.howToImage}
							/>
							<Text>
								{"4. DISPOSE OF GLOVES AND WASH HANDS: "}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Dispose of gloves in the appropriate biohazard container.\n" +
									"- Wash hands thoroughly with soap and warm running water, if available.\n" +
									"- If soap and running water are unavailable and hands are not visibly soiled, " +
									"rub hands thoroughly with an alcohol-based hand sanitizer.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*Injured/Ill Adult*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setCheckAdultVisable(!checkAdultVisable);
						}}
					>
						{"Checking an Injured or Ill Adult (Unconscious)"}
						<Icon
							name={
								checkAdultVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{checkAdultVisable && (
						<>
							<Text>
								{"Use disposable gloves and other personal protective equipment (PPE).\n" +
									"After checking scene for safety, check the person:\n"}
							</Text>
							<Text>{"1. CHECK RESPONSIVENESS:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{'Tap the shoulder and shout, "Are you OK?"\n'}
							</Text>
							<Text>
								{
									"2. IF NO RESPONSE, CALL 9-1-1 OR THE LOCAL EMERGENCY NUMBER: "
								}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Send someone to get an AED, if possible.\n" +
									"- If an unconscious person is face-down, roll him or her face-up keeping " +
									"the head, neck and back in a straight line.\n" +
									"- If the person responds, obtain consent and call 9-1-1 or the local emergency " +
									"number for any life-threatening conditions. Check the responsive person from " +
									"head to toe and ask questions to find out what happened.\n"}
							</Text>
							<Text>{"3. OPEN THE AIRWAY: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Tilt head; lift chin.\n"}
							</Text>
							<Text>{"4. CHECK FOR BREATHING: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"Check for no more than 10 seconds.\n- Occasional gasps are not breathing.\n"
								}
							</Text>
							<Image
								source={require("../../assets/images/checkAdultBreathing.png")}
								style={howToStyles.howToImage}
							/>
							<Text>
								{"5. QUICKLY SCAN FOR SEVERE BLEEDING\n "}
							</Text>
							<Text>{"NEXT STEPS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- If there is no breathing, perform CPR or use an AED (if AED is immediately " +
									"available).\n" +
									"- If breathing, maintain an open airway and monitor breathing and for any " +
									"changes in condition.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*Injured/Ill Child*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setCheckChildVisable(!checkChildVisable);
						}}
					>
						{"Checking an Injured or Ill Child (Unconscious)"}
						<Icon
							name={
								checkChildVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{checkChildVisable && (
						<>
							<Text>
								{"Use disposable gloves and other personal protective equipment (PPE).\n" +
									"After checking scene for safety, check the person:\n"}
							</Text>
							<Text>{"1. CHECK RESPONSIVENESS:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{'Tap the shoulder and shout, "Are you OK?"\n'}
							</Text>
							<Text>
								{
									"2. IF NO RESPONSE, CALL 9-1-1 OR THE LOCAL EMERGENCY NUMBER: "
								}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Send someone to get an AED, if possible.\n" +
									"- If an unconscious child is face-down, roll him or her face-up keeping " +
									"the head, neck and back in a straight line.\n" +
									"- If ALONE, give about 2 minutes of care, then call 9-1-1\n" +
									"- If the child responds, call 9-1-1 or the local emergency number for " +
									"any life-threatening conditions and obtain consent to give care. check " +
									"the responsive child from head to toe and ask questions to find out " +
									"what happened.\n"}
							</Text>
							<Text>{"3. OPEN THE AIRWAY: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Tilt head back slightly; lift chin.\n"}
							</Text>
							<Text>{"4. CHECK FOR BREATHING: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"Check for no more than 10 seconds.\n- Occasional gasps are not breathing.\n"
								}
							</Text>
							<Text>
								{"5. IF NO BREATHING, GIVE 2 RESCUE BREATHS: "}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Tilt the head back and lift the chin up.\n" +
									"- Pinch the nose shut then make a complete seal over the child's mouth.\n" +
									"- Blow in for about 1 second to make the chest clearly rise.\n" +
									"- Give rescue breaths, one after the other.\n"}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"If chest does not rise with the initial rescue breath, retilt the head before " +
									"giving the second breath.\n" +
									"If you witnessed the child suddenly collapse, skip rescue breaths and start " +
									"CPR.\n"}
							</Text>
							<Image
								source={require("../../assets/images/childRescueBreaths.png")}
								style={howToStyles.howToImage}
							/>
							<Text>
								{"6. QUICKLY SCAN FOR SEVERE BLEEDING\n "}
							</Text>
							<Text>{"NEXT STEPS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- If the second breath does not make the chest rise, the child may be choking. " +
									"Give care for unconscious choking by performing CPR, starting with compressions.\n" +
									"- If there is no breathing, perform CPR or use an AED (if AED is immediately " +
									"available).\n" +
									"- If breathing, maintain an open airway and monitor breathing and for any " +
									"changes in condition.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*CPR*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setCPRVisable(!cprVisable);
						}}
					>
						{"CPR - Adult or Child"}
						<Icon
							name={
								cprVisable ? "chevron-down" : "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{cprVisable && (
						<>
							<Text>
								{
									"After checking scene for safety, check the person:\n"
								}
							</Text>
							<Text>{"1. GIVE 30 CHEST COMPRESSIONS:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Push hard, push fast in the middle of the chest at a rate of at least " +
									"100 compressions per minute.\n" +
									"- Adult: Push at least 2 inches deep.\n" +
									"- Child: Push about 2 inches deep. The person must be on firm, flat " +
									"surface.\n"}
							</Text>
							<Image
								source={require("../../assets/images/CPR1.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"2. GIVE 2 RESCUE BREATHS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Tilt the head back and lift the chin up.\n" +
									"- Pinch the nose shut then make a complete seal over the person’s mouth.\n" +
									"- Blow in for about 1 second to make the chest clearly rise.\n" +
									"- Give rescue breaths, one after the other.\n"}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"If chest does not rise with the initial rescue breath, retilt the head before " +
									"giving the second breath.\n" +
									"If the second breath does not make the chest rise, the person may be choking. " +
									"After each subsequent set of chest compressions and before attempting breaths, " +
									"look for an object and, if seen, remove it. Continue CPR.\n"}
							</Text>
							<Image
								source={require("../../assets/images/CPR2.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"3. DO NOT STOP: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Continue cycles of CPR. Do not stop except in one of these situations:" +
									"- You find an obvious sign of life (such as breathing).\n" +
									"- An aed is ready to use.\n" +
									"- Another trained responder or EMS personnel take over.\n" +
									"- You are too exhausted to continue.\n" +
									"- The scene becomes unsafe.\n"}
							</Text>
							<Text>{"NEXT STEPS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Use an AED as soon as one is available.\n" +
									"- If at any time you notice an obvious sign of life, stop CPR " +
									"and monitor breathing and for any changes in condition.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*AED*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setAEDVisable(!aedVisable);
						}}
					>
						{
							"AED - Adult or Child\nNOT BREATHING\n(8+ years old or +55lbs)"
						}
						<Icon
							name={
								aedVisable ? "chevron-down" : "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{aedVisable && (
						<>
							<Text>
								{
									"After checking scene for safety, check the person, have someone call 9-1-1:\n"
								}
							</Text>
							<Text>{"1. TURN ON AED:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Follow the voice and/or visual prompts.\n"}
							</Text>
							<Image
								source={require("../../assets/images/AED1.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"2. WIPE BARE CHEST DRY: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{
									"Remove any medication patches with a gloved hand.\n"
								}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- If chest does not rise with the initial rescue breath, retilt the head before " +
									"giving the second breath.\n" +
									"- If the second breath does not make the chest rise, the person may be choking. " +
									"After each subsequent set of chest compressions and before attempting breaths, " +
									"look for an object and, if seen, remove it. Continue CPR.\n"}
							</Text>
							<Text>{"3. ATTACH PADS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Do not use pediatric AED pads or equipment on an adult or " +
									"child older than 8 years or weighing more than 55 pounds.\n"}
							</Text>
							<Image
								source={require("../../assets/images/AED3.png")}
								style={howToStyles.howToImage}
							/>
							<Text>
								{"4. PLUG IN CONNECTOR, if necessary\n"}
							</Text>
							<Image
								source={require("../../assets/images/AED4.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"5. STAND CLEAR: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Make sure no one, including you, is touching the person.\n" +
									'- Say, "Everyone, STAND CLEAR."\n'}
							</Text>
							<Image
								source={require("../../assets/images/AED5.png")}
								style={howToStyles.howToImage}
							/>
							<Text>
								{"6. LET THE AED ANALYZE HEART RHYTHM: "}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{'Push the "analyze" button, if necessary.\n'}
							</Text>
							<Text>{"7. DELIVER SHOCK, if advised: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Make sure no one, including you, is touching the person.\n" +
									'- Say, "Everyone, STAND CLEAR."\n' +
									"- Push the “shock” button, if necessary.\n"}
							</Text>
							<Image
								source={require("../../assets/images/AED7.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"8. PERFORM CPR: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"After delivering the shock, or if no shock is advised:\n" +
									"- Perform about 2 minutes (or 5 cycles) of CPR.\n" +
									"- Continue to follow the prompts of the AED.\n"}
							</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- If at any time you notice an obvious sign of life, stop CPR and " +
									"monitor breathing and for any changes in condition.\n" +
									"- If two trained responders are present, one should perform CPR " +
									"while the other operates the AED.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*Conscious Choking*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
						onPress={() => {
							LayoutAnimation.Presets.easeInEaseOut;
							setChokingVisable(!chokingVisable);
						}}
					>
						{"Conscious Choking"}
						<Icon
							name={
								chokingVisable
									? "chevron-down"
									: "chevron-forward"
							}
							size={20}
							backgroundColor="transparent"
							color="black"
						/>
					</Text>
					{chokingVisable && (
						<>
							<Text>
								{"After checking scene for safety, check the person, " +
									"have someone call 9-1-1 and get consent:\n"}
							</Text>
							<Text>{"1. GIVE 5 BACK BLOWS:"}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Bend the person forward at the waist and give 5 back " +
									"blows between the shoulder blades with the heel of " +
									"one hand.\n" +
									"- Stand or kneel behind a child, depending on his or her size.\n"}
							</Text>
							<Image
								source={require("../../assets/images/choking1.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"2. GIVE 5 ABDOMINAL THRUSTS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- Place a fist with the thumb side against the middle of the person's " +
									"abdomen, just above the navel.\n" +
									"- Cover your fist with your other hand.\n" +
									"- Give 5 quick, upward abdominal thrusts.\n"}
							</Text>
							<Image
								source={require("../../assets/images/choking2.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"3. CONTINUE CARE: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"Give sets of 5 back blows and 5 abdominal thrusts until the:\n" +
									"- Object is forced out.\n" +
									"- Person can cough forcefully or breathe.\n" +
									"- Person becomes unconscious.\n"}
							</Text>
							<Image
								source={require("../../assets/images/choking3.png")}
								style={howToStyles.howToImage}
							/>
							<Text>{"NEXT STEPS: "}</Text>
							<Text style={{ marginHorizontal: "5%" }}>
								{"- If the person becomes unconscious, call 9-1-1 if not already done.\n" +
									"- Carefully lower him or her to the ground and begin CPR, starting " +
									"with compressions.\n"}
							</Text>
						</>
					)}
				</View>

				<View style={howToStyles.separator} />

				{/*Wound Cleaning*/}
				<View
					style={{
						width: "90%",
						borderBottomColor: "grey",
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={howToStyles.header}
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
			</ScrollView>
		</SafeAreaView>
	);
}

const howToStyles = StyleSheet.create({
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
	howToImage: {
		marginHorizontal: "5%",
		marginTop: -10,
		marginBottom: 10,
		width: "90%",
		height: undefined,
		aspectRatio: 3 / 2,
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
