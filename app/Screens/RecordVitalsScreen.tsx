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
  FlatList,
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
// import NumberPad from "../assets/components/NumberPad";
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

const numColumns = 3;

const NumberPad = ({ navigation, nextPage, updateFn, intervaled = false }) => {
  const data = [
    { key: '0' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' },
    { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: 'DEL' },
    { key: '9' }, { key: 'ENTER' },
  ];

  const [value, setValue] = useState("");

  const determineValue = ({ itemClicked }) => {
    if (itemClicked == null) {
      return;
    }
    if (itemClicked.key == 'ENTER') {
      // save to db and navigate to other page.
      let val = parseInt(value)
      if (intervaled) val = val * intervalTime;
      updateFn(val)
      navigation.push(nextPage, { value: value });
    }
    else if (itemClicked.key == 'DEL') {
      setValue(value.substring(0, value.length - 1));
    }
    else {
      setValue(value + itemClicked.key);
    }
  }

  const renderItem = ({ item, index }) => {
    if (item.key == 'ENTER' || item.key == 'DEL') {
      return (
        <TouchableOpacity
          style={[numpadStyles.item, numpadStyles.itemSpecial]}
          onPress={() => { determineValue({ itemClicked: item }); }}
        >
          <Text style={numpadStyles.itemText}>{item.key}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={numpadStyles.item}
        onPress={() => { determineValue({ itemClicked: item }); }}
      >
        <Text style={numpadStyles.itemText}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colours.blue }}>
      <StatusBar barStyle="dark-content" backgroundColor="#CFE7EF" />
      <View style={numpadStyles.valueContainer}>
        <Text style={numpadStyles.valueText}>{value}</Text>
      </View>
      <FlatList
        data={data}
        style={numpadStyles.container}
        renderItem={renderItem}
        numColumns={numColumns}

      />
    </SafeAreaView>
  );
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

  // console.log("avpu_index is: ", avpu_index)
  const backgroundColour = colours.orange;
  return (
    <SafeAreaView style={[vitalsStyles.container, vitalsStyles.countdown_container, { backgroundColor: backgroundColour }]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColour} />
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
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColour} />

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
      nextPage="Prepare"
      updateFn={updatePulse} />
  );
}


// respiration: the number of breaths a person takes per minute,
function RespScreen({ navigation }) {
  nextVital = "Skin";
  return (
    <NumberPad
      navigation={navigation}
      nextPage="Skin"
      updateFn={updatePulse} />
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
          < NumberPad navigation={navigation} nextPage={"tmp"} updateFn={updateTemp} />
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
function tmpScreen() {

  if (updateData) updateData(true);
  return (
    <View></View>
  );
}


let updateAVPU, updatePulse, updateResp, updateSkin, updateTemp, updateData;

const Stack = createNativeStackNavigator();

export default function RecordVitalsStack({ route, navigation }) {

  const { patient, updateVital } = useVitals();

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

const numpadStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginTop: 40,

  },
  item: {
    backgroundColor: colours.yellowBackground,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: 0.75 * (Dimensions.get('window').width) / numColumns, // approximate a square
    borderWidth: 1,

  },
  itemSpecial: {
    backgroundColor: colours.yellowDarker,
  },
  itemText: {
    color: colours.primary,
    fontSize: 25
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 0.15 * (Dimensions.get('window').height),
    backgroundColor: "#CFE7EF",
  },
  valueText: {
    fontSize: 50,
  }
});