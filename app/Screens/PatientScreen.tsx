import {
	Oxygen_300Light,
	Oxygen_400Regular,
	Oxygen_700Bold,
	useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	Platform,
	SafeAreaView,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	LayoutAnimation,
	View,
	UIManager,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { useAuth } from "../../providers/AuthProvider";
import { usePatients } from "../../providers/PatientProvider";

import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";

import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";

export default function PatientScreen({ patientObj }) {
    // Enable animation for drop-down graph/table
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const { patient } = patientObj.params;
	const { user, signOut } = useAuth();
	const navigation = useNavigation();

	const { updatePatient, closeRealm } = usePatients();

	let [fontsLoaded] = useFonts({
		Oxygen_300Light,
		Oxygen_400Regular,
		Oxygen_700Bold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
        return (
                    <SafeAreaView
                        style={[globalStyles.container, {backgroundColor: colours.redBackground}]}
                    >
                        {/* Code for top-level login header */}
                       <ProfileHeader image={images[0]} statusbarColour={colours.redBackground}/>

                        {/* Code for patient level header */}
                        <View style={styles.headerPatient}>
                            <View style={styles.profileView}>
                                <Text style={styles.patientName}>{patient.name}</Text>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.profilePicture}
                                        source={images[patient.image]}
                                    />
                                </TouchableOpacity>
                            </View>
                            <AppButton
                                title="PDF"
                                style={styles.pdfButton}
                                buttonTextStyle={styles.pdfButtonText}
                                onPress={() => console.log("generate pdf")}
                            />
                        </View>

                        {/* Code for list of vitals */}
                        <FlatList
                            style={styles.vitalsScrollView}
                            contentContainerStyle={{
                                alignSelf: "stretch",
                                paddingBottom: 100,
                            }}
                            data={DATA}
                            renderItem={({ item }) => (
                                <RenderVitalsItem
                                    item={item}
                                    onPressInfo={() => console.log(item.title + " info pressed")}
                                    onPressAdd={() => console.log(item.title + " add new reading")}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />

                        {/* Code for add new vital button*/}
                        <AddButton onPress={() => console.log("New Vital Pressed")}/>
                    </SafeAreaView>
                );
	}
}



const vitalItemStyles = StyleSheet.create({
        headerPatient: {
            backgroundColor: colours.orange,
            height: Platform.OS == "ios" ? "10%" : "7%",
            width: "100%",
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        patientName: {
            margin: -10,
            alignSelf: "center",
            fontSize: 25,
            fontWeight: "700",
        },
        pdfButton: {
            height: "60%",
            top: "20%",
            flex: 1,
            backgroundColor: colours.lightBlueBackground,
            borderRadius: 15,
            color: colours.primary,
            position: "absolute",
            right: 10,
            alignSelf: "center",
            borderColor: colours.primary,
            borderWidth: 1,
            padding: 6,
        },
        pdfButtonText: {
            fontSize: 20,
            fontWeight: "600",
            top: Platform.OS == "ios" ? -4 : -1,
        },
    	vitalsScrollView: {
    		flex: 1,
    		width: "100%",
    	},
});

