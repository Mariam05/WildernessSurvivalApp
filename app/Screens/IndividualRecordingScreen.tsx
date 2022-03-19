/**
 * TO DO:
 * - Create a header with buttons:
 *  - have a 'restart'
 */

import React, { useEffect } from "react";
import {
    BackHandler,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Text,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StyleSheet } from "react-native";
import colours from "../assets/colours";
import CountDown from "react-native-countdown-component";
import NumberPad2 from "../assets/components/NumberPad_v2";
import { useVitals } from "../../providers/VitalProvider";
import { Patient, Reading } from "../../schemas";
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

// how long to wait before sending the user a notification to update vitals
const notification_min = 1; // set to 1 min for now, for demo purposes

const prepareTime = 5;
const intervalTime = 15;

// sounds
var Sound = require("react-native-sound");
Sound.setCategory("Playback");
const beep_file = require("../assets/sounds/censorship-beep.wav");
const getReadyFile = require("../assets/sounds/getready.m4a"); // start 0.01
const get_ready_time = 0.01;

function playSound(file, start = null) {

    const callback = (error, sound) => {
        if (error) {
            console.log("failed to load the sound", error);
            return;
        }

        if (start) sound.setCurrentTime(start);

        sound.play(() => {
            console.log("playing sound");
            // Success counts as getting to the end
            // Release when it's done so we're not using up resources
            sound.release();
        });
    };

    const sound = new Sound(file, (error) => callback(error, sound));
}

function PrepareScreen({ navigation }) {

    playSound(getReadyFile, get_ready_time);

    const backgroundColour = colours.orange;

    return (
        <SafeAreaView
            style={[
                quickVitalsStyles.container,
                quickVitalsStyles.countdown_container,
                { backgroundColor: backgroundColour },
            ]}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={backgroundColour}
            />
            <CountDown
                until={prepareTime}
                size={70}
                style={{ padding: 10 }}
                onFinish={() => {
                    playSound(beep_file);
                    navigation.push("Countdown");
                }}
                digitStyle={{ backgroundColor: backgroundColour }}
                digitTxtStyle={{ color: colours.primary, fontSize: 120 }}
                timeToShow={["S"]}
                timeLabels={{ s: null }}
            />
            <Text style={quickVitalsStyles.countdown_subtitle}>
                {" "}
                GET READY TO MEASURE {vitalName.toUpperCase()}{" "}
            </Text>
        </SafeAreaView>
    );
}

function CountdownScreen({ navigation }) {

    const backgroundColour = colours.green;
    return (
        <SafeAreaView
            style={[
                quickVitalsStyles.container,
                quickVitalsStyles.countdown_container,
                { backgroundColor: backgroundColour },
            ]}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={backgroundColour}
            />

            <CountDown
                until={intervalTime}
                size={70}
                style={{ padding: 10 }}
                onFinish={() => {
                    playSound(beep_file);
                    navigation.push("Numpad");
                }}
                digitStyle={{ backgroundColor: backgroundColour }}
                digitTxtStyle={{ color: colours.primary, fontSize: 120 }}
                timeToShow={["S"]}
                timeLabels={{ s: null }}
            />
            <Text style={quickVitalsStyles.countdown_subtitle}>
                TAKE {vitalName.toUpperCase()} READING
            </Text>

        </SafeAreaView>
    );
}


function NumpadScreen({ navigation }) {
    const { patient, updateVital } = useVitals();

    return (
        <NumberPad2
            navigation={navigation}
            onFinish={
                (value) => {
                    const reading = new Reading({
                        timestamp: Date.now().toString(),
                        value: value,
                    });
                    updateVital(vitalName, reading);
                    scheduleNotification(patient);
                    backToPatient(navigation, patient);
                }}
            title={vitalName} />
    );
}

function backToPatient(navigation, patient: Patient) {
    navigation.push("Patient", {
        patientId: patient._id.toString()
    });
}

let vitalName;

const Stack = createNativeStackNavigator();

export default function IndividualRecordingStack({ route, navigation }) {
    const { patient } = useVitals();

    const { vital_name } = route.params;
    vitalName = vital_name;

    // back press stuff
    const backActionHandler = () => {
        backToPatient(navigation, patient);
        return true;
    };


    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                backActionHandler
            );
        };
    });

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Prepare"
                component={PrepareScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="Countdown"
                component={CountdownScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="Numpad"
                component={NumpadScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
        </Stack.Navigator>
    );
}

/**
 * This function schedules a notification to be sent
 * once a certain amount of minutes has elapsed from the current time
 * @param patient
 */
async function scheduleNotification(patient: Patient) {

    // Create a channel
    const channelId = await notifee.createChannel({
        id: 'vitals',
        name: 'Vitals Reminder Channel',
    });

    // Required for iOS
    await notifee.requestPermission();


    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + notification_min);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    // Display a notification.
    // we use the patient ID as the notification ID.
    // by doing so, if a user takes another vital reading before the notification is displayed, the scheduled time can be updated
    await notifee.createTriggerNotification(
        {
            id: String(patient._id),
            title: 'Time to Measure ' + patient.name + ' \'s Vitals',
            body: 'It\'s been ' + notification_min + ' minutes since the last reading',
            android: {
                channelId,
                color: colours.green,
                largeIcon: require('../assets/images/grass.png'),
                // smallIcon: // optional, defaults to 'ic_launcher'. only works for android. requires android studio to set up. blegh
            },
        },
        trigger
    );
}

const quickVitalsStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avpu_pic: {
        width: "90%",
        height: 100,
        borderColor: colours.primary,
        borderWidth: 5,
        borderRadius: 50,
    },
    avpu_view: {
        borderRadius: 50,
        borderWidth: 0,
        margin: 15,
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    countdown_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    countdown_subtitle: {
        textAlign: "center",
        fontSize: 50,
        color: colours.grey,
        fontWeight: "700",
        fontFamily: "Oxygen_700Bold",
        flexWrap: "wrap",
    },
    skinButtons: {
        color: "black",
        alignContent: "center",
        justifyContent: "center",
        height: (0.7 * Dimensions.get("window").height) / 5,
        margin: 5,
        borderRadius: 50,
        borderWidth: 1,
    },
    skinText: {
        alignSelf: "center",
        textTransform: "uppercase",
        fontSize: 25,
    },
    skipButton: {
        flexDirection: "column",
        height: 50,
        width: "100%",
        maxWidth: 350,
        marginVertical: "20%",
        backgroundColor: colours.primary,
        borderWidth: 0,
        borderRadius: 25,
        alignContent: "center",
        justifyContent: "center",
        shadowColor: colours.primary,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 3,
        elevation: 4,
    },
    skipButtonText: {
        fontSize: 20,
        color: colours.secondary,
        fontWeight: "bold",
        alignSelf: "center",
    },
    title: {
        fontSize: 50,
        fontWeight: "700",
        fontFamily: "Oxygen_700Bold",
        padding: 10,
        textAlign: "center",
        top: 0,
    },
});
