import React, { useEffect } from "react";
import {
	LayoutAnimation,
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
import globalStyles from "../assets/stylesheet";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import LogoutButton from "../assets/components/LogoutButton";
import { useState } from "react";

export default function MenuScreen() {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(colours.blue);

	const navigation = useNavigation();
	const { user, signOut } = useAuth();

	const [resourcesExpanded, setResourcesExpanded] = useState(false);

	const isAnon = user && user.providerType === "anon-user";
	isAnon ? null : user && user.refreshCustomData();

	const onPressResources = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setResourcesExpanded(!resourcesExpanded);
	};

	const isFocused = useIsFocused();
	useEffect(() => {
		user && user.refreshCustomData();
		user && user.providerType === "anon-user";
	}, [isFocused, user]);

	if (user) user.refreshCustomData();

	if (user == null) {
		return <View />;
	} else {
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

				{/* Profile Info */}
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
						<Text style={[menuStyles.titleText, { fontSize: 35 }]}>
							{isAnon
								? "A"
								: !user.customData
								? "NA"
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
						<Text style={menuStyles.titleText}>
							{isAnon
								? "Anonymous"
								: !user.customData
								? "Not Found"
								: user.customData.firstName +
								  " " +
								  user.customData.lastName}
						</Text>
						<Text style={menuStyles.subHeading}>
							{isAnon ? "ID: 0x" + user.id : user.profile.email}
						</Text>
					</View>
				</View>

				<ScrollView
					contentContainerStyle={menuStyles.containerScrollView}
					style={{ width: "100%" }}
					scrollEnabled={false}
				>
					{!isAnon ? (
						<TouchableOpacity
							style={menuStyles.optionItem}
							onPress={() => navigation.navigate("Profile")}
						>
							<Text style={menuStyles.optionText}>
								<Icon
									size={35}
									name="person-outline"
									color="black"
									backgroundColor="transparent"
								/>
								{"\t"}
								Profile Settings
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={menuStyles.optionItem}
							onPress={() => navigation.navigate("Login")}
						>
							<Text style={menuStyles.optionText}>
								<Icon
									size={35}
									name="log-in-outline"
									color="black"
									backgroundColor="transparent"
								/>
								{"\t"}
								Login
							</Text>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						style={menuStyles.optionItem}
						onPress={() => console.log("App settings clicked")}
					>
						<Text style={menuStyles.optionText}>
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
						style={menuStyles.optionItem}
						onPress={onPressResources}
					>
						<Text style={menuStyles.optionText}>
							<Icon
								size={35}
								name="book-outline"
								color="black"
								backgroundColor="transparent"
							/>
							{"\t"}
							Resources
						</Text>
					</TouchableOpacity>

					{resourcesExpanded && (
						<>
							{/*Checklist*/}
							<TouchableOpacity
								style={menuStyles.subOptionItem}
								onPress={() =>
									navigation.navigate("Checklists")
								}
							>
								<Text style={menuStyles.subOptionText}>
									<Icon
										size={20}
										name="checkbox-outline"
										color="black"
										backgroundColor="transparent"
									/>
									{"\t"}
									Checklists
								</Text>
							</TouchableOpacity>

							{/*Quick Ref*/}
							<TouchableOpacity
								style={menuStyles.subOptionItem}
								onPress={() =>
									navigation.navigate("QuickReference")
								}
							>
								<Text style={menuStyles.subOptionText}>
									<Icon
										size={20}
										name="medical-outline"
										color="black"
										backgroundColor="transparent"
									/>
									{"\t"}
									Quick Reference
								</Text>
							</TouchableOpacity>

							{/*Quick Assess*/}
							<TouchableOpacity
								style={menuStyles.subOptionItem}
								onPress={() =>
									navigation.navigate("Assessments")
								}
							>
								<Text style={menuStyles.subOptionText}>
									<Icon
										size={20}
										name="medkit-outline"
										color="black"
										backgroundColor="transparent"
									/>
									{"\t"}
									Quick Assessments
								</Text>
							</TouchableOpacity>

							{/*Anatomy*/}
							<TouchableOpacity
								style={menuStyles.subOptionItem}
								onPress={() => navigation.navigate("Anatomy")}
							>
								<Text style={menuStyles.subOptionText}>
									<Icon
										size={20}
										name="body-outline"
										color="black"
										backgroundColor="transparent"
									/>
									{"\t"}
									Human Anatomy
								</Text>
							</TouchableOpacity>

							{/*How to*/}
							<TouchableOpacity
								style={menuStyles.subOptionItem}
								onPress={() => navigation.navigate("HowTo")}
							>
								<Text style={menuStyles.subOptionText}>
									<Icon
										size={20}
										name="search-outline"
										color="black"
										backgroundColor="transparent"
									/>
									{"\t"}
									How To...
								</Text>
							</TouchableOpacity>
						</>
					)}

					<TouchableOpacity
						style={menuStyles.optionItem}
						onPress={() => console.log("Help and Support clicked")}
					>
						<Text style={menuStyles.optionText}>
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
						style={menuStyles.optionItem}
						onPress={() => console.log("Invite Friends clicked")}
					>
						<Text style={menuStyles.optionText}>
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
						style={menuStyles.optionItem}
						onPress={() => console.log("Feedback clicked")}
					>
						<Text style={menuStyles.optionText}>
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

					{!isAnon ? (
						<LogoutButton
							navigation={navigation}
							closeRealm={null}
							signOut={signOut}
							style={menuStyles.optionItem}
							textStyle={menuStyles.optionText}
						/>
					) : null}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const menuStyles = StyleSheet.create({
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
	subOptionItem: {
		alignSelf: "flex-end",
		flexDirection: "row",
		paddingVertical: 5,
		marginVertical: 15,
		marginEnd: "5%",
		width: "85%",
		justifyContent: "flex-start",
		borderBottomColor: "grey",
		borderBottomWidth: 1,
	},
	subOptionText: {
		color: "black",
		fontSize: 12,
		fontWeight: "bold",
	},
	titleText: {
		fontSize: 25,
		fontWeight: "500",
		textAlign: "center",
		fontFamily: "Oxygen_700Bold",
	},
});
