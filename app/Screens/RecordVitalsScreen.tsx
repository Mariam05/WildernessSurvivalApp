/**
 * TO DO: 
 * - Create a header with buttons:
 *  - have a 'pause' 
 *  - have a 'restart' and/or 'cancel' button
 *  - add sounds to timer
 *  - add option to skip any reading
 *  - change quick vitals to be activated when patient is pressed (remove 'GO')
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
import CountDown from 'react-native-countdown-component';
import NumberPad from "../assets/components/NumberPad";
import AppButton from "../assets/components/AppButton";
import SwitchSelector from "react-native-switch-selector";
import { useVitals, VitalsProvider } from "../../providers/VitalProvider";
import { Reading } from "../../schemas";

// images
var avpu_awake = require("../assets/images/avpu_awake.png");
var avpu_verbal = require("../assets/images/avpu_verbal.png");
var avpu_pain = require("../assets/images/avpu_pain.png");
var avpu_unresponsive = require("../assets/images/avpu_unresponsive.png");

const avpu_pics = [{ image: avpu_awake, name: "Awake" },
{ image: avpu_verbal, name: "Verbal" },
{ image: avpu_pain, name: "Pain" },
{ image: avpu_unresponsive, name: "Unresponsive" }];
const prepareTime = 5;
const intervalTime = 15;

var nextVital; // to store the next vital to prepare for. 

// sounds
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const beep_file = require('../assets/sounds/censorship-beep.wav');
const getReadyFile = require('../assets/sounds/getready.m4a'); // start 0.01
const get_ready_time = 0.01;
const getreadyresp_file = require('../assets/sounds/getreadyresp.m4a'); // start at 0.02
const resp_start_time = 0.02
const getreadypulse_file = require('../assets/sounds/getreadypulse.m4a'); // start at 0.03
const pulse_start_time = 0.04

function playSound(file, start = null) {
  const callback = (error, sound) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }

    if (start) sound.setCurrentTime(start);
    sound.play(() => {
      // Success counts as getting to the end
      console.log('duration in seconds: ' + sound.getDuration() + ' number of channels: ' + sound.getNumberOfChannels());
      // Release when it's done so we're not using up resources
      sound.release();
    });

  };

  const sound = new Sound(file, error => callback(error, sound));
}

// Awake Verbal Pain and Unresponsive.. how responsive are they?
function AvpuScreen({ navigation }) {
  nextVital = "Pulse";
  return (
    <SafeAreaView style={[vitalsStyles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={vitalsStyles.title}> AVPU </Text>
      <ScrollView
        horizontal={false}
        style={[{ backgroundColor: colours.blue, }]}
        contentContainerStyle={{
          alignSelf: "stretch",
          paddingBottom: "30%",
          paddingTop: 30,
        }}
      >
        {avpu_pics.map((avpu, index) => (
          <TouchableOpacity
            onPress={() => {
              {
                if (updateAVPU) updateAVPU(avpu.name);
                playSound(getReadyFile, 0.01);
                navigation.push("Prepare");
              }
            }}
            key={index}
          >
            <View
              style={vitalsStyles.avpu_view}
            >
              <Image
                style={vitalsStyles.avpu_pic}
                source={avpu.image}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PrepareScreen({ route, navigation }) {
  if (route.params) {
    const { value } = route.params;
    if (nextVital == "Respiration") {
      console.log("updating pulse with value ", value);
      if (updatePulse) updatePulse(value * (60 / intervalTime));
    }
  }

  playSound(getReadyFile, get_ready_time);

  const backgroundColour = colours.orange;
  return (
    <SafeAreaView style={[vitalsStyles.container, vitalsStyles.countdown_container, { backgroundColor: backgroundColour }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColour} />
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
        timeToShow={['S']}
        timeLabels={{ s: null }}
      />
      <Text style={vitalsStyles.countdown_subtitle}> GET READY TO MEASURE {nextVital.toUpperCase()} </Text>

    </SafeAreaView>

  );
}

function CountdownScreen({ navigation }) {
  const backgroundColour = colours.green;
  return (
    <SafeAreaView style={
      [vitalsStyles.container,
      vitalsStyles.countdown_container,
      { backgroundColor: backgroundColour }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColour} />

      <CountDown
        until={intervalTime}
        size={70}
        style={{ padding: 10 }}
        onFinish={() => { playSound(beep_file); navigation.navigate(nextVital); }}
        digitStyle={{ backgroundColor: backgroundColour }}
        digitTxtStyle={{ color: colours.primary, fontSize: 120 }}
        timeToShow={['S']}
        timeLabels={{ s: null }}
      />
      <Text style={vitalsStyles.countdown_subtitle}>TAKE {nextVital.toUpperCase()} READING</Text>
    </SafeAreaView>
  );
}

// Pulse
function PulseScreen({ navigation }) {
  nextVital = "Respiration";
  return (
    <NumberPad
      navigation={navigation}
      nextPage="Prepare" />
  );
}


// respiration: the number of breaths a person takes per minute
function RespScreen({ navigation }) {
  nextVital = "Skin";
  return (
    <NumberPad
      navigation={navigation}
      nextPage="Skin" />
  );
}

const options = [
  { option: "warm", colour: colours.redBackground },
  { option: "pink", colour: colours.pinkBackground },
  { option: "white", colour: colours.secondary },
  { option: "blue", colour: colours.lightBlueBackground },
  { option: "normal", colour: colours.green },
  { option: "skip", colour: colours.primary, },
];

const optionsSize = options.length;

// skin: warm, pink, blue, white
function SkinScreen({ route, navigation }) {
  // update the value from the previous screen
  // console.log("in skin, route is: ", route);
  const { value } = route.params;
  if (value && updateResp) updateResp(value * intervalTime);

  // render skin options
  nextVital = "Temperature";
  return (
    <SafeAreaView style={[vitalsStyles.container]}>
      <Text style={vitalsStyles.title}> Skin </Text>
      {options.map((skinOption, index) => (
        <View
          key={index}
          style={[]}>
          <AppButton
            title={skinOption.option}
            onPress={() => {
              updateSkin(skinOption.option);
              navigation.push(nextVital);
            }}
            style={[vitalsStyles.skinButtons, { backgroundColor: skinOption.colour }]}
            buttonTextStyle={[vitalsStyles.skinText, { color: skinOption.option == "skip" ? "white" : "black" }]} />

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
  { option: "very feverish", colour: colours.red, },
];

const tempOptionsSize = temp_options.length;

// number or comment
// normal, warm, slightly feverish.
function TempScreen({ navigation }) {
  const [showNumPad, setShowNumpad] = useState(0);
  return (
    <SafeAreaView style={[vitalsStyles.container]}>
      <Text style={vitalsStyles.title}> Temperature </Text>
      <View style={{ alignItems: "center" }}>
        <SwitchSelector
          initial={1}
          onPress={value => setShowNumpad(+value)}
          textColor={colours.yellowDarker}
          selectedColor={colours.secondary}
          buttonColor={colours.yellowBackground}
          borderColor={colours.yellowBackground}
          hasPadding
          options={[
            { label: "Enter Number", value: 1 },
            { label: "Select Option", value: 0 }
          ]}
          accessibilityLabel="temp-input-selector"
        />
      </View>
      {showNumPad ?
        (
          < NumberPad navigation={navigation} nextPage={"tmp"} />
        ) :
        (<View>
          {temp_options.map((tempOption, index) => (
            <View
              key={index}
              style={[]}>
              <AppButton
                title={tempOption.option}
                onPress={() => {
                  if (updateTemp) updateTemp(tempOption.option)
                  if (updateData) updateData(true);
                  navigation.push("Landing");
                }}
                style={[vitalsStyles.skinButtons, { backgroundColor: tempOption.colour }]}
                buttonTextStyle={[vitalsStyles.skinText, { color: tempOption.option == "skip" ? "white" : "black" }]} />

            </View>
          ))}

        </View>)
      }
    </SafeAreaView>
  );
}


// Somethign for the numpad to redirect to
function tmpScreen({ route, navigation }) {

  const { value } = route.params;
  if (updateTemp) updateTemp(value);
  if (updateData) updateData(true);
  console.log("in tmp")
  // navigation.navigate("Landing");
  return (
    <View></View>
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


  const [avpu_val, setAvpuVal] = useState()
  const [pulse_val, setPulseVal] = useState()
  const [resp_val, setRespVal] = useState()
  const [skin_val, setSkinVal] = useState()
  const [temp_val, setTempVal] = useState()
  const [save_data, setData] = useState()

  const vals = [{ name: "AVPU", value: avpu_val },
  { name: "Pulse", value: pulse_val },
  { name: "Respiration", value: resp_val },
  { name: "Skin", value: skin_val }, { name: "Temperature", value: temp_val }]

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
      vals.map((val) => {
        if (val) {
          const reading = new Reading({ timestamp: Date.now().toString(), value: val.value });
          updateVital(val.name, reading);
          console.log("saving data for " + val.name);
        }
      })
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
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    }
  })



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
        component={tmpScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

    </Stack.Navigator>
  );
}

const vitalsStyles = StyleSheet.create({
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
        shadowColor: '#000',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdown_subtitle: {
    textAlign: 'center',
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
    height: 0.7 * (Dimensions.get('window').height) / optionsSize,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
  },
  skinText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontSize: 25,

  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    fontFamily: "Oxygen_700Bold",
    padding: 10,
    textAlign: "center",
    top: 0,
  }

});
