import {
    Oxygen_300Light,
    Oxygen_400Regular,
    Oxygen_700Bold,
    useFonts,
} from "@expo-google-fonts/oxygen";
import { ObjectId } from "bson";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    LayoutAnimation,
    View,
    KeyboardAvoidingView,
    UIManager,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { useAuth } from "../../providers/AuthProvider";
import { useVitals } from "../../providers/VitalProvider";

import ProfileHeader from "../assets/components/ProfileHeader";
import AddButton from "../assets/components/AddButton";
import AppButton from "../assets/components/AppButton";
import { VitalModal } from "../assets/components/VitalModal";
import VitalItem, { vitalItemStyles } from "../assets/components/VitalItem";

import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import colours from "../assets/colours";


const vitalTypes = ["Numerical", "Categorical"];

export default function PatientScreen({ navigation, route }) {
    // Enable animation for drop-down graph/table
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    const { user, signOut } = useAuth();
    const { patient, createVital } = useVitals();

    const { patientId, patientName } = route.params;

    const [vitalName, setVitalName] = useState("");
    const [vitalPeriodicity, setVitalPeriodicity] = useState(0);
    const [vitalType, setVitalType] = useState("");
    const [vitalCategories, setVitalCategories] = useState([]);
    const [newVitalCategory, setNewVitalCategory] = useState("");

    const updateVitalCategory = (category, index) => {
        setVitalCategories(arr => { arr[index] = category; return arr });
        setNewVitalCategory("");
    }
    const deleteVitalCategory = (index) => {
        setVitalCategories(arr => { arr.splice(index, 1); return arr });
        setVitalCategories(arr => [...arr]); //required to re render
        setNewVitalCategory("");
    }
    const appendVitalCategory = (category) => {
        setVitalCategories(arr => [...arr, category]);
        setNewVitalCategory("");
    }

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
                style={[globalStyles.container, { backgroundColor: colours.redBackground }]}
            >
                {/* Code for patient level header */}
                <View style={PatientScreenStyles.headerPatient}>
                    <TouchableOpacity style={PatientScreenStyles.backButton} onPress={() => navigation.goBack()}>
                        <Image
                            style={PatientScreenStyles.backButtonImage}
                            source={require("../assets/images/back.png")}
                        />
                    </TouchableOpacity>

                    <View >
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
                    data={patient.vitals}
                    renderItem={({ item }) => (
                        <VitalItem
                            name={item.name}
                            periodicity={item.periodicity}
                            type={item.type}
                            data={item.data}
                            description={item.description}
                            timeElapsed={item.timeElapsed}
                            onPressInfo={() => console.log(item.title + " info pressed")}
                            onPressAdd={() => console.log(item.title + " add new reading")}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Code for add new vital button */}
                <AddButton onPress={handleModal} />

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
                                    <View style={{ marginVertical: "3%" }} />
                                    <VitalItem
                                        name={vitalName}
                                        periodicity={vitalPeriodicity}
                                        type={vitalType}
                                        description={""}
                                        data={[]}
                                        timeElapsed={0}
                                        onPressAdd={null}
                                        onPressInfo={null}
                                    />

                                    <View style={{ marginVertical: "3%" }} />

                                    <TextInput
                                        style={[globalStyles.credentialInput, { width: "100%", margin: 0 }]}
                                        clearButtonMode="while-editing"
                                        returnKeyType="next"
                                        textContentType="username"
                                        placeholder="Vital Name"
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        value={vitalName}
                                        onChangeText={setVitalName}
                                    />
                                    <View style={{ marginVertical: "3%" }} />
                                    <TextInput
                                        style={[globalStyles.credentialInput, { width: "100%", margin: 0 }]}
                                        clearButtonMode="while-editing"
                                        returnKeyType="next"
                                        textContentType="username"
                                        placeholder="Periodicity (minutes)"
                                        autoCorrect={false}
                                        keyboardType="numeric"
                                        value={vitalPeriodicity.toString()}
                                        onChangeText={(val) => setVitalPeriodicity(parseInt(val))}
                                    />
                                    <View style={{ marginVertical: "3%" }} />
                                    <Text style={modalStyles.modalSubHeadingText}>Type</Text>
                                    <SegmentedControl
                                        values={vitalTypes}
                                        onValueChange={setVitalType}
                                    />

                                    <View style={{ marginVertical: "1%" }} />
                                    {vitalType == "Categorical" && (
                                        <View>
                                            {vitalCategories.map((category, index) => (
                                                <View>
                                                    <View>
                                                        <TextInput
                                                            style={[globalStyles.credentialInput, { width: "100%", margin: 0 }]}
                                                            clearButtonMode="while-editing"
                                                            returnKeyType="next"
                                                            textContentType="username"
                                                            placeholder="category"
                                                            autoCapitalize="words"
                                                            autoCorrect={false}
                                                            value={category}
                                                            onChangeText={(val) => updateVitalCategory(val, index)}
                                                        />
                                                        <AppButton
                                                            title="x"
                                                            style={PatientScreenStyles.vitalCategoryButton}
                                                            buttonTextStyle={PatientScreenStyles.vitalCategoryDeleteButtonText}
                                                            onPress={() => deleteVitalCategory(index)}
                                                        />
                                                    </View>
                                                    <View style={{ marginVertical: "1%" }} />
                                                </View>

                                            ))}
                                            <View>
                                                <TextInput
                                                    style={[globalStyles.credentialInput, { width: "100%", margin: 0 }]}
                                                    clearButtonMode="while-editing"
                                                    returnKeyType="next"
                                                    textContentType="username"
                                                    placeholder={"Category " + (vitalCategories.length + 1)}
                                                    autoCapitalize="words"
                                                    autoCorrect={false}
                                                    value={newVitalCategory}
                                                    onChangeText={setNewVitalCategory}
                                                />
                                                <AppButton
                                                    title="+"
                                                    style={PatientScreenStyles.vitalCategoryButton}
                                                    buttonTextStyle={PatientScreenStyles.vitalCategoryAddButtonText}
                                                    onPress={() => appendVitalCategory(newVitalCategory)}
                                                />
                                            </View>
                                        </View>
                                    )}

                                </VitalModal.Body>
                                <VitalModal.Footer>
                                    <AppButton
                                        title="Cancel"
                                        style={modalStyles.modalCancelButton}
                                        buttonTextStyle={modalStyles.modalButtonText}
                                        onPress={() => {
                                            setVitalName("");
                                            setVitalPeriodicity(0);
                                            setVitalType("");
                                            setVitalCategories([]);
                                            handleModal();
                                        }}
                                    />
                                    <AppButton
                                        title="Submit"
                                        style={modalStyles.modalSubmitButton}
                                        buttonTextStyle={modalStyles.modalButtonText}
                                        onPress={() => {
                                            createVital(
                                                new ObjectId(patientId),
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
        height: Platform.OS == "ios" ? "10%" : "8%",
        padding: 0,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    backButton: {
        left: 10,
        position: "absolute",
        justifyContent: "center",
        alignSelf: "center",
        padding: 0,
        margin: 0,
        width: 40,
        height: "100%",
    },
    backButtonImage: {
        width: "100%",
        height: "50%",
    },
    patientName: {
        alignItems: "center",
        fontSize: 25,
        fontWeight: "700",
    },
    pdfButton: {
        height: "60%",
        top: "20%",
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
    vitalCategoryButton: {
        backgroundColor: colours.redBackground,


        height: "50%",
        aspectRatio: 1,

        position: "absolute",
        right: 10,
        top: 10,

        borderRadius: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        elevation: 7,
        shadowColor: colours.primary,
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,

    },
    vitalCategoryDeleteButtonText: {
        fontSize: 24,
        fontWeight: "700",
        top: -7,
    },
    vitalCategoryAddButtonText: {
        fontSize: 25,
        fontWeight: "700",
        top: -7,
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