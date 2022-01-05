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
import { VitalModal } from "../assets/components/PatientModal";
import VitalItem, {vitalItemStyles} from "../assets/components/VitalItem";

import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";

const vitalTypes = ["Numerical", "Categorical"];

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

	const { vitals, createVital, updateVital } = useVitals();

    const [vitalName, setVitalName] = useState("");
    const [vitalPeriodicity, setVitalPeriodicity] = useState(0);
    const [vitalType, setVitalType] = useState("");
    const [vitalCategories, setVitalCategories] = useState([]);


    const updateVitalCategory = (category, index) => {
        setVitalCategories(arr => {arr[index] = category; return arr});
    }
    const deleteVitalCategory = (index) => {
        setVitalCategories(arr => {arr.splice(index, 1); return arr});
    }
    const appendVitalCategory = (category) => {
        setVitalCategories(arr => [...arr, category]);
    }


    const [newVitalCategory, setNewVitalCategory] = useState("");


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
                                <VitalItem
                                    item={item}
                                    onPressInfo={() => console.log(item.title + " info pressed")}
                                    onPressAdd={() => console.log(item.title + " add new reading")}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />

                        {/* Code for add new vital button */}
                        <AddButton onPress={isModalVisible}/>

                        {/* Code for add new vital info */}
                        <VitalModal isVisible={isModalVisible}>
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                <ScrollView
                                    style={{ top: Platform.OS == "ios" ? "5%" : 0, }}
                                    keyboardDismissMode="on-drag"
                                    keyboardShouldPersistTaps="never"
                                >
                                    <VitalModal.Container>
                                        <VitalModal.Header />
                                        <VitalModal.Body>
                                            <View style={{marginVertical: "3%"}} />
                                            <VitalItem item={vital}/>

                                            <View style={{marginVertical: "3%"}} />

                                            <TextInput
                                                style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
                                                clearButtonMode="while-editing"
                                                returnKeyType="next"
                                                textContentType="username"
                                                placeholder="Vital Name"
                                                autoCapitalize="words"
                                                autoCorrect={false}
                                                value={vitalName}
                                                onChangeText={setVitalName}
                                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            />
                                            <View style={{marginVertical: "3%"}} />
                                            <TextInput
                                                ref={(input) => { this.secondTextInput = input; }}
                                                style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
                                                clearButtonMode="while-editing"
                                                keyboardType = 'number-pad'
                                                returnKeyType="next"
                                                placeholder="Periodicity (minutes)"
                                                autoCorrect={false}
                                                value={vitalPeriodicity}
                                                onChangeText={setVitalPeriodicity}
                                            />
                                            <View style={{marginVertical: "3%"}} />
                                            <Text style={modalStyles.modalSubHeadingText}>Type</Text>
                                            <SegmentedControl
                                                values={vitalTypes}
                                                onValueChange={setVitalType}
                                            />
                                            {vitalType == "Categorical" && vitalCategories.map((category, index) => (
                                                 <View>
                                                     <TextInput
                                                        ref={(input) => { this.secondTextInput = input; }}
                                                        style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
                                                        clearButtonMode="while-editing"
                                                        returnKeyType="next"
                                                        textContentType="username"
                                                        placeholder="Category {index}"
                                                        autoCorrect={false}
                                                        value={category}
                                                        onChangeText={() => updateVitalCategory(category, index)}
                                                    />
                                                    <AppButton
                                                        title="X"
                                                        style={modalStyles.vitalCategoryButton}
                                                        buttonTextStyle={modalStyles.vitalCategoryButtonText}
                                                        onPress={() => {deleteVitalCategory(index)}}
                                                    />
                                                 </View>
                                                ))
                                                <View>
                                                     <TextInput
                                                        ref={(input) => { this.secondTextInput = input; }}
                                                        style={[globalStyles.credentialInput, {width: "100%", margin:0}]}
                                                        clearButtonMode="while-editing"
                                                        returnKeyType="next"
                                                        textContentType="username"
                                                        placeholder="Category {index}"
                                                        autoCorrect={false}
                                                        value={newVitalCategory}
                                                        onChangeText={setNewVitalCategory}
                                                    />
                                                    <AppButton
                                                        title="+"
                                                        style={modalStyles.vitalCategoryButton}
                                                        buttonTextStyle={modalStyles.vitalCategoryButtonText}
                                                        onPress={() => {appendVitalCategory(newVitalCategory)}}
                                                    />
                                                 </View>
                                            }
                                        </VitalModal.Body>
                                        <VitalModal.Footer>
                                            <AppButton
                                                title="Cancel"
                                                style={modalStyles.modalCancelButton}
                                                buttonTextStyle={modalStyles.modalButtonText}
                                                onPress={() => {
                                                    setVital({})
                                                    handleModal();
                                                }}
                                            />
                                            <AppButton
                                                title="Submit"
                                                style={modalStyles.modalSubmitButton}
                                                buttonTextStyle={modalStyles.modalButtonText}
                                                onPress={() => {
                                                    createVital(
                                                        vitalName,
                                                        vitalPeriodicity,
                                                        vitalType,
                                                        "",
                                                        vitalCategories
                                                    );
                                                    setVitalName("");
                                                    setVitalPeriodicity(0);
                                                    setVitalType(null);
                                                    setVitalCategories([]);
                                                    handleModal();
                                                }}
                                            />
                                        </VitalModal.Footer>
                                    </VitalModal.Container>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </VitalModal>


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
    	vitalsScrollView: {
            flex: 1,
            width: "100%",
            backgroundColor: colours.background,
        },
        vitalCategoryButton: {
           backgroundColor: colours.purple,
           height: "70%",
           color: colours.primary,
           position: "absolute",
           right: 10,
           alignSelf: "center",
           borderColor: colours.primary,
           borderWidth: 1,
           padding: 6,
        },
        vitalCategoryButtonText: {
            fontSize: 30,
            fontWeight: "700",
            top: "-5%"
        },
});

const modalStyles = StyleSheet.create({
	modalButtonText: {
		fontSize: 20,
		color: colours.primary,
		alignSelf: "center",
	},
	modalCancelButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.blue,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},
	modalSubHeadingText: {
		fontSize: 17,
		fontWeight: "500",
	},
	modalSubmitButton: {
		flexDirection: "column",
		height: 50,
		width: "40%",
		maxWidth: 300,
		margin: 10,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
	},

});
