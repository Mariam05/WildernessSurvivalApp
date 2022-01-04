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
import { useVitals } from "../../providers/VitalProvider";

import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";
import AppButton from "../assets/components/AppButton";

import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";

export default function PatientScreen() {
    // Enable animation for drop-down graph/table
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const { patientName } = {};

	const { user, signOut } = useAuth();
	const navigation = useNavigation();

	const { updatePatient } = usePatients();
	const { vitals, createVital, updateVital } = useVitals();

    const [vitalName, setVitalName] = useState("");
    const [vitalPeriodicity, setVitalPeriodicity] = useState(0);
    const [vitalType, setVitalType] = useState("");
    const [vitalCategories, setVitalCategories] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
                        <View style={PatientScreenStyles.headerPatient}>
                            <View style={PatientScreenStyles.profileView}>
                                <Text style={PatientScreenStyles.patientName}>{patientName}</Text>
                            </View>
                            <AppButton
                                title="PDF"
                                style={PatientScreenStyles.pdfButton}
                                buttonTextStyle={PatientScreenStyles.pdfButtonText}
                                onPress={() => console.log("generate pdf")}
                            />
                        </View>

                        {/* Code for list of vitals */}
                        <FlatList
                            style={PatientScreenStyles.vitalsScrollView}
                            contentContainerStyle={{
                                alignSelf: "stretch",
                                paddingBottom: 100,
                            }}
                            data={vitals}
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



const PatientScreenStyles = StyleSheet.create({
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
    		backgroundColor: colours.background,
    	},
});

