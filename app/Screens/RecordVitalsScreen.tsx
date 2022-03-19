/**
 * TO DO:
 * - Create a header with buttons:
 *  - have a 'restart'
 */

import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StyleSheet } from "react-native";
import colours from "../assets/colours";
import CountDown from "react-native-countdown-component";
import NumberPad from "../assets/components/NumberPad";
import AppButton from "../assets/components/AppButton";
import SwitchSelector from "react-native-switch-selector";
import { useVitals, VitalsProvider } from "../../providers/VitalProvider";
import globalStyles from "../assets/stylesheet";
import { Patient, Reading } from "../../schemas";
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

// how long to wait before sending the user a notification to update vitals
const notification_min = 1; // set to 1 min for now, for demo purposes

// images
var avpu_awake = require("../assets/images/avpu_awake.png");
var avpu_verbal = require("../assets/images/avpu_verbal.png");
var avpu_pain = require("../assets/images/avpu_pain.png");
var avpu_unresponsive = require("../assets/images/avpu_unresponsive.png");

const avpu_pics = [
  { image: avpu_awake, name: "Awake" },
  { image: avpu_verbal, name: "Verbal" },
  { image: avpu_pain, name: "Pain" },
  { image: avpu_unresponsive, name: "Unresponsive" },
];
const prepareTime = 5;
const intervalTime = 15;


// to determine what the next screen is given the current vital
const next_vital = { "AVPU": "Prepare", "Pulse": "Respiration", "Respiration": "Skin" };
const start_screen = { "Pulse": "Prepare", "Respiration": "Prepare", "Skin": "Skin" };

var nextVital; // to store the next vital to prepare for.
var nextScreen;

// sounds
var Sound = require("react-native-sound");
Sound.setCategory("Playback");
const beep_file = require("../assets/sounds/censorship-beep.wav");
const getReadyFile = require("../assets/sounds/getready.m4a"); // start 0.01
const get_ready_time = 0.01;
const getreadyresp_file = require("../assets/sounds/getreadyresp.m4a"); // start at 0.02
const resp_start_time = 0.02;
const getreadypulse_file = require("../assets/sounds/getreadypulse.m4a"); // start at 0.03
const pulse_start_time = 0.04;

let curr_sound;
function playSound(file, start = null) {
  const callback = (error, sound) => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }

    if (start) sound.setCurrentTime(start);

    curr_sound = sound;
    sound.play(() => {
      // Success counts as getting to the end
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  const sound = new Sound(file, (error) => callback(error, sound));
}

function stopSound() {

  if (curr_sound) {
    curr_sound.stop(); curr_sound.release(); console.log("stopping sound");
  }
}

// Awake Verbal Pain and Unresponsive.. how responsive are they?
function AvpuScreen({ navigation }) {
  nextVital = "Pulse";
  return (
    <SafeAreaView style={[quickVitalsStyles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={quickVitalsStyles.title}> AVPU </Text>
      <ScrollView
        horizontal={false}
        style={[{ backgroundColor: colours.blue }]}
        contentContainerStyle={{
          paddingTop: 30,
        }}
      >

        {avpu_pics.map((avpu, index) => (
          <TouchableOpacity
            onPress={() => {
              {
                if (updateAVPU) updateAVPU(avpu.name);
                playSound(getReadyFile, 0.01);
                navigation.push("Prepare", { current_vital: nextVital });
              }
            }}
            key={index}
          >
            <View style={quickVitalsStyles.avpu_view}>
              <Image
                style={quickVitalsStyles.avpu_pic}
                source={avpu.image}
              />
            </View>
          </TouchableOpacity>
        ))}
        <AppButton
          onPress={() => {
            navigation.push("Prepare");
          }}
          title="Skip AVPU"
          style={[quickVitalsStyles.skipButton, { marginTop: -0.5, alignSelf: "center" }]}
          buttonTextStyle={[quickVitalsStyles.skipButtonText]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function PrepareScreen({ route, navigation }) {
  if (route.params) {
    const { value, next_vital } = route.params;
    if (next_vital) nextVital = next_vital;
    console.log("next vital is " + nextVital);
    if (value && nextVital == "Respiration") {
      if (updatePulse) updatePulse(value * (60 / intervalTime));
    }
  }

  const [skipped, setSkipped] = useState(false);

  playSound(getReadyFile, get_ready_time);

  const backgroundColour = colours.orange;

  const skipText = "Skip " + nextVital;
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
        running={!skipped}
      />
      <Text style={quickVitalsStyles.countdown_subtitle}>
        {" "}
        GET READY TO MEASURE {nextVital.toUpperCase()}{" "}
      </Text>
      <AppButton
        onPress={() => {
          nextVital = next_vital[nextVital] // get the one after
          nextScreen = start_screen[nextVital]
          navigation.push(nextScreen);
          setSkipped(true);
        }}
        title={skipText}
        style={[quickVitalsStyles.skipButton]}
        buttonTextStyle={[quickVitalsStyles.skipButtonText]}
      />
    </SafeAreaView>
  );
}

function CountdownScreen({ navigation }) {
  const [skipped, setSkipped] = useState(false);

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
          navigation.navigate(nextVital);
        }}
        digitStyle={{ backgroundColor: backgroundColour }}
        digitTxtStyle={{ color: colours.primary, fontSize: 120 }}
        timeToShow={["S"]}
        timeLabels={{ s: null }}
        running={!skipped}
      />
      <Text style={quickVitalsStyles.countdown_subtitle}>
        TAKE {nextVital.toUpperCase()} READING
      </Text>
      <AppButton
        onPress={() => {
          stopSound();
          nextVital = next_vital[nextVital] // get the one after
          nextScreen = start_screen[nextVital]
          navigation.push(nextScreen);
          setSkipped(true);
        }}
        title={"Skip " + nextVital}
        style={[quickVitalsStyles.skipButton]}
        buttonTextStyle={[quickVitalsStyles.skipButtonText]}
      />
    </SafeAreaView>
  );
}

// Pulse
function PulseScreen({ navigation }) {
  nextVital = "Respiration";
  return (
    <NumberPad navigation={navigation} nextPage="Prepare" title="Pulse" />
  );
}

// respiration: the number of breaths a person takes per minute
function RespScreen({ navigation }) {
  nextVital = "Skin";
  return (
    <NumberPad
      navigation={navigation}
      nextPage="Skin"
      title="Respiration"
    />
  );
}

const options = [
  { option: "warm", colour: colours.redBackground },
  { option: "pink", colour: colours.pinkBackground },
  { option: "white", colour: colours.secondary },
  { option: "blue", colour: colours.lightBlueBackground },
  { option: "normal", colour: colours.green },
  { option: "skip", colour: colours.primary },
];

const optionsSize = options.length;

// skin: warm, pink, blue, white
function SkinScreen({ route, navigation }) {
  stopSound();
  // update the value from the previous screen
  // console.log("in skin, route is: ", route);
  if (route.params) {
    const { value } = route.params;
    if (value && updateResp) updateResp(value * (60 / intervalTime));
  }


  // render skin options
  nextVital = "Temperature";
  return (
    <SafeAreaView style={[quickVitalsStyles.container]}>
      <Text style={quickVitalsStyles.title}> Skin </Text>
      {options.map((skinOption, index) => (
        <View key={index} style={[]}>
          <AppButton
            title={skinOption.option}
            onPress={() => {
              updateSkin(skinOption.option);
              navigation.push(nextVital);
            }}
            style={[
              quickVitalsStyles.skinButtons,
              { backgroundColor: skinOption.colour },
            ]}
            buttonTextStyle={[
              quickVitalsStyles.skinText,
              {
                color:
                  skinOption.option == "skip"
                    ? "white"
                    : "black",
              },
            ]}
          />
        </View>
      ))}
    </SafeAreaView>
  );
}

const temp_options = [
  { option: "very cold", colour: colours.blue },
  { option: "cold", colour: colours.lightBlueBackground },
  { option: "normal", colour: colours.green },
  { option: "slightly feverish", colour: colours.redBackground },
  { option: "very feverish", colour: colours.red },
  { option: "skip", colour: colours.primary },
];

const tempOptionsSize = temp_options.length;

// number or comment
// normal, warm, slightly feverish.
function TempScreen({ navigation }) {
  const [showNumPad, setShowNumpad] = useState(0);
  return (
    <SafeAreaView style={[quickVitalsStyles.container]}>
      <Text style={quickVitalsStyles.title}> Temperature </Text>
      <View style={{ alignItems: "center" }}>
        <SwitchSelector
          initial={1}
          onPress={(value) => setShowNumpad(+value)}
          textColor={colours.yellowDarker}
          selectedColor={colours.secondary}
          buttonColor={colours.yellowBackground}
          borderColor={colours.yellowBackground}
          hasPadding
          options={[
            { label: "Enter Number", value: 1 },
            { label: "Select Option", value: 0 },
          ]}
          accessibilityLabel="temp-input-selector"
        />
      </View>
      {showNumPad ? (
        <NumberPad
          navigation={navigation}
          nextPage={"tmp"}
          title="Temperature"
        />
      ) : (
        <View>
          {temp_options.map((tempOption, index) => (
            <View key={index} style={[]}>
              <AppButton
                title={tempOption.option}
                onPress={() => {
                  if (updateTemp)
                    updateTemp(tempOption.option);
                  if (updateData) updateData(true);
                  navigation.push("Landing");
                }}
                style={[
                  quickVitalsStyles.skinButtons,
                  { backgroundColor: tempOption.colour },
                ]}
                buttonTextStyle={[
                  quickVitalsStyles.skinText,
                  {
                    color:
                      tempOption.option == "skip"
                        ? "white"
                        : "black",
                  },
                ]}
              />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// Somethign for the numpad to redirect to
function TmpScreen({ route, navigation }) {

  const { value } = route.params;
  if (updateTemp) updateTemp(value);
  if (updateData) updateData(true);
  console.log("in tmp")
  // navigation.navigate("Landing");
  return (
    <View></View>
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

let updateAVPU, updatePulse, updateResp, updateSkin, updateTemp, updateData;

const Stack = createNativeStackNavigator();

export default function RecordVitalsStack({ route, navigation }) {
  const { patient, updateVital } = useVitals();
  // if (patient != null) console.log("useVitals patient: " + patient.name);
  // if (patient == null) console.log("useVitals patient is null");

  // back press stuff
  const backActionHandler = () => {
    navigation.navigate("Landing");
    return true;
  };

  const [avpu_val, setAvpuVal] = useState();
  const [pulse_val, setPulseVal] = useState();
  const [resp_val, setRespVal] = useState();
  const [skin_val, setSkinVal] = useState();
  const [temp_val, setTempVal] = useState();
  const [save_data, setData] = useState();

  const vals = [
    { name: "AVPU", value: avpu_val },
    { name: "Pulse", value: pulse_val },
    { name: "Respiration", value: resp_val },
    { name: "Skin", value: skin_val },
    { name: "Temperature", value: temp_val },
  ];

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    /* Assign update to outside variable */
    updateAVPU = setAvpuVal;
    updatePulse = setPulseVal;
    updateResp = setRespVal;
    updateSkin = setSkinVal;
    updateTemp = setTempVal;
    updateData = setData;

    if (save_data) {
      stopSound();
      vals.map((val) => {
        if (val.value != null && val.value != "skip") {
          const reading = new Reading({
            timestamp: Date.now().toString(),
            value: val.value,
          });
          updateVital(val.name, reading);
          console.log("saving data for " + val.name);
        }
      });
      scheduleNotification(patient);
      navigation.navigate("Landing");
    }

    /* Unassign when component unmounts */
    return () => {
      updateAVPU = null;
      updatePulse = null;
      updateResp = null;
      updateSkin = null;
      updateTemp = null;
      updateData = null;
      BackHandler.removeEventListener(
        "hardwareBackPress",
        backActionHandler
      );
    };
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Avpu"
        component={AvpuScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
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
        name="Pulse"
        component={PulseScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Respiration"
        component={RespScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Skin"
        component={SkinScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Temperature"
        component={TempScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="tmp"
        component={TmpScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
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
    height: (0.7 * Dimensions.get("window").height) / optionsSize,
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
