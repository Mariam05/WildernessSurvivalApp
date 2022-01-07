import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colours from "../colours";
import { useAuth } from "../../../providers/AuthProvider";
import { images } from "../ProfilePics";


export default function ProfileHeader({statusbarColour}) {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(statusbarColour, true);

    const {user} = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.profileView}>
				<TouchableOpacity onPress={() => {
					user.refreshCustomData();
					console.log(user.profile);
					navigation.navigate("Profile");
				}}>
                    <Image
						style={styles.profilePicture}
						source={user.customData ? images[user.customData.image] : null}
                    />
                </TouchableOpacity>
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
