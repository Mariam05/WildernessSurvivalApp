import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import colours from "../colours";
import { useAuth } from "../../../providers/AuthProvider";
import { images } from "../ProfilePics";
import AppButton from "./AppButton";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";


export default function ProfileHeader({statusbarColour, navigation}) {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(statusbarColour, true);

    const { user } = useAuth();
    
	const isFocused = useIsFocused();
	useEffect(() => {
		user.refreshCustomData();
	}, [isFocused]);

    return (
        <View style={styles.header}>
			<View style={styles.profileView}>
				{user && user.providerType === "anon-user" ?
					<AppButton
						title={"Login"}
						style={{
							backgroundColor: colours.pinkBackground,
							borderRadius: 100,
							alignItems: "center",
							justifyContent: "center",
							width: 75,
							shadowColor: colours.primary,
							shadowOpacity: 0.4,
							shadowOffset: { width: 0, height: 3 },
							shadowRadius: 3,
							elevation: 6,
						}}
						buttonTextStyle={{
							fontSize: 17,
							color: colours.primary,
							alignSelf: "center",
						}}
						onPress={() => navigation.navigate("Login")}
					/>
					:
					<TouchableOpacity onPress={() => {
						user.refreshCustomData();
						navigation.navigate("Profile");
					}}>
						<Image
							style={styles.profilePicture}
							source={user.customData ? images[user.customData.image] : null}
						/>
					</TouchableOpacity>
				}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
	header: {
		flex: 0.1,
		flexDirection: "column",
		alignItems: "flex-end",
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60: 0,
		width: "100%",
		backgroundColor: colours.redBackground,
	},
	profilePicture: {
		resizeMode: "cover",
		borderRadius: 100,
		margin: 0,
		backgroundColor: colours.secondary,
		height: "110%",
		aspectRatio: 1,
	},
	profileView: {
		height: "50%",
		margin: 20,
		alignContent: "center",
		justifyContent: "flex-end",
		flexDirection: "row",
		backgroundColor: "transparent",
	},
});
