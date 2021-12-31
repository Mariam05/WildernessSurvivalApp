import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./app/Screens/LandingScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import PatientScreen from "./app/Screens/PatientScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="Landing"
					component={LandingScreen}
					options={{ headerShown: false, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="Patient"
					component={PatientScreen}
					options={{ headerShown: false, gestureEnabled: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
