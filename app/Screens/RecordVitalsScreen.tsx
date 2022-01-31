/**
 * TO DO: 
 * - Create a header with buttons:
 *  - have a 'pause' 
 *  - have a 'restart' and/or 'cancel' button
 *  - add sounds to timer
 *  - add option to skip any reading
 */

import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
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

// images
var avpu_awake = require("../assets/images/avpu_awake.png");
var avpu_verbal = require("../assets/images/avpu_verbal.png");
var avpu_pain = require("../assets/images/avpu_pain.png");
var avpu_unresponsive = require("../assets/images/avpu_unresponsive.png");

const avpu_pics = [avpu_awake, avpu_verbal, avpu_pain, avpu_unresponsive];
const prepareTime = 5;
const intervalTime = 15;

var nextVital; // to store the next vital to prepare for. 

// Awake Verbal Pain and Unresponsive.. how responsive are they?
function AvpuScreen({ navigation }) {
  nextVital = "Pulse";
  return (
    <SafeAreaView style={[vitalsStyles.container]}>
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
        {avpu_pics.map((image, index) => (
          <TouchableOpacity
            onPress={() => {
              {
                console.log("pressed");
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
                source={image}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PrepareScreen({ route, navigation }) {
  const backgroundColour = colours.orange;
  return (
    <SafeAreaView style={[vitalsStyles.container, vitalsStyles.countdown_container, { backgroundColor: backgroundColour }]}>
      <CountDown
        until={prepareTime}
        size={70}
        style={{ padding: 10 }}
        onFinish={() => {
          navigation.push("Countdown")
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

      <CountDown
        until={intervalTime}
        size={70}
        style={{ padding: 10 }}
        onFinish={() => { navigation.navigate(nextVital); }}
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
function SkinScreen({ navigation }) {
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
              console.log(skinOption.option);
              // something to save the choice
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
  // const toggleSwitch = () => setShowNumpad(previousState => !previousState);
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
          < NumberPad navigation={navigation} nextPage={"Landing"} />
        ) :
        (<View>
          {temp_options.map((tempOption, index) => (
            <View
              key={index}
              style={[]}>
              <AppButton
                title={tempOption.option}
                onPress={() => {
                  console.log(tempOption.option);
                  // something to save the choice
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

const Stack = createNativeStackNavigator();

export default function RecordVitalsStack() {
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
      // options={{ headerShown: false, gestureEnabled: false }} 
      />
      <Stack.Screen
        name="Respiration"
        component={RespScreen}
      // options={{ headerShown: false, gestureEnabled: false }} 
      />
      <Stack.Screen
        name="Skin"
        component={SkinScreen}
      // options={{ headerShown: false, gestureEnabled: false }} 
      />
      <Stack.Screen
        name="Temperature"
        component={TempScreen}
      // options={{ headerShown: false, gestureEnabled: false }} 
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
