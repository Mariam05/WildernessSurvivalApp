import React from "react";
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { useAuth } from "../../providers/AuthProvider";
import colours from "../assets/colours";
import AppButton from "../assets/components/AppButton";
import globalStyles from "../assets/stylesheet";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuScreen() {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(colours.blue);

	const navigation = useNavigation();

	const { user } = useAuth();

	const isAnon = user && user.providerType === "anon-user";

	return (
		<SafeAreaView
			style={[
				globalStyles.container,
				{
					backgroundColor: colours.blue,
					justifyContent: "flex-start",
					alignItems: "flex-start",
				},
			]}
		>
			<StatusBar
				hidden={false}
				animated={true}
				backgroundColor={colours.blue}
				barStyle={"dark-content"}
			/>

			<View style={{ marginHorizontal: "5%", marginTop: 10 }}>
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

			<View
				style={{
					flexDirection: "row",
					paddingVertical: 10,
					marginHorizontal: "5%",
					marginTop: 10,
					width: "90%",
					alignItems: "flex-start",
					borderBottomColor: "grey",
					borderBottomWidth: 1,
				}}
			>
				<View
					style={{
						width: "20%",
						height: undefined,
						aspectRatio: 1,
						backgroundColor: colours.purple,
						borderRadius: 100,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={[profileStyles.titleText, { fontSize: 35 }]}>
						{isAnon
							? "A"
							: user.customData.firstName[0] +
							  user.customData.lastName[0]}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "column",
						alignItems: "flex-start",
						marginHorizontal: 10,
					}}
				>
					<Text style={profileStyles.titleText}>
						{isAnon
							? "Anonymous"
							: user.customData.firstName +
							  " " +
							  user.customData.lastName}
					</Text>
					<Text style={profileStyles.subHeading}>
						ID: 0x{user.id}
					</Text>
					{!isAnon ? (
						<AppButton
							title="Edit Profile"
							onPress={() => navigation.navigate("Profile")}
							style={undefined}
							buttonTextStyle={[
								profileStyles.subHeading,
								{ color: "white", fontStyle: "normal" },
							]}
						/>
					) : (
						<AppButton
							title="Login"
							onPress={() => navigation.navigate("Login")}
							style={undefined}
							buttonTextStyle={[
								profileStyles.subHeading,
								{ color: "white", fontStyle: "normal" },
							]}
						/>
					)}
				</View>
			</View>

			<ScrollView
				contentContainerStyle={profileStyles.containerScrollView}
				style={{ width: "100%" }}
				scrollEnabled={false}
			>
				<TouchableOpacity
					style={profileStyles.optionItem}
					onPress={() => console.log("App settings clicked")}
				>
					<Text style={profileStyles.optionText}>
						<Icon
							size={35}
							name="settings-outline"
							color="black"
							backgroundColor="transparent"
						/>
						{"\t"}
						App Settings
					</Text>
					{
						// TODO: Implement some sort of settings page?
					}
				</TouchableOpacity>

				<TouchableOpacity
					style={profileStyles.optionItem}
					onPress={() => console.log("Resources clicked")}
				>
					<Text style={profileStyles.optionText}>
						<Icon
							size={35}
							name="book-outline"
							color="black"
							backgroundColor="transparent"
						/>
						{"\t"}
						Resources
					</Text>
					{
						// TODO: Implement the additional resources here?
					}
				</TouchableOpacity>

				<TouchableOpacity
					style={profileStyles.optionItem}
					onPress={() => console.log("Help and Support clicked")}
				>
					<Text style={profileStyles.optionText}>
						<Icon
							size={35}
							name="help"
							color="black"
							backgroundColor="transparent"
						/>
						{"\t"}
						Help and Support
					</Text>
					{
						// TODO: Implement some sort of help page where users can see contact info of wilderness survival resources or contacts for help with the app?
					}
				</TouchableOpacity>

				<TouchableOpacity
					style={profileStyles.optionItem}
					onPress={() => console.log("Invite Friends clicked")}
				>
					<Text style={profileStyles.optionText}>
						<Icon
							size={35}
							name="person-add-outline"
							color="black"
							backgroundColor="transparent"
						/>
						{"\t"}
						Invite Friends
					</Text>
					{
						// TODO: Prompt user to share link to app?
					}
				</TouchableOpacity>

				<TouchableOpacity
					style={profileStyles.optionItem}
					onPress={() => console.log("Feedback clicked")}
				>
					<Text style={profileStyles.optionText}>
						<Icon
							size={35}
							name="mail-outline"
							color="black"
							backgroundColor="transparent"
						/>
						{"\t"}
						Feedback
					</Text>
					{
						// TODO: Provide way for user to provide feedback?...likely a quick form to fill out and it should send an email or something
					}
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const profileStyles = StyleSheet.create({
	containerScrollView: {
		top: 0,
		bottom: 0,
		paddingTop: 20,
	},
	optionItem: {
		alignSelf: "center",
		flexDirection: "row",
		paddingVertical: 5,
		marginVertical: 15,
		width: "90%",
		justifyContent: "flex-start",
		borderBottomColor: "grey",
		borderBottomWidth: 1,
	},
	optionText: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	subHeading: {
		color: "gray",
		fontSize: 15,
		fontWeight: "500",
		textAlign: "left",
		fontStyle: "italic",
	},
	titleText: {
		fontSize: 25,
		fontWeight: "500",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
});
