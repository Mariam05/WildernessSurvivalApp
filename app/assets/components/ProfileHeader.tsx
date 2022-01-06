import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colours from "../colours";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../../providers/AuthProvider";
import { usePatients } from "../../../providers/PatientProvider";
import { images } from "../ProfilePics";


export default function ProfileHeader({statusbarColour }) {
	Platform.OS === "ios" ? null : StatusBar.setBackgroundColor(statusbarColour, true);

    const {user, signOut} = useAuth();
	const { closeRealm } = usePatients();
    const navigation = useNavigation();

	user.refreshCustomData();

    return (
        <View style={styles.header}>
            <LogoutButton
                closeRealm={closeRealm}
                signOut={signOut}
                navigation={navigation}
            />
            <View style={styles.profileView}>
				<TouchableOpacity onPress={() => {
					user.refreshCustomData();
					console.log(user.customData);
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
		backgroundColor: colours.redBackground,
		width: "100%",
		flex: 0.1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		top: Platform.OS === "android" ? StatusBar.currentHeight - 60: 0,
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
		flex: 0.5,
	},
});
