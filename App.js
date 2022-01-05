import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./app/Screens/LandingScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import { AuthProvider } from "./providers/AuthProvider";
import { PatientsProvider } from "./providers/PatientProvider";
import SignUpScreen from "./app/Screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ headerShown: false, gestureEnabled: false }}
					/>
					<Stack.Screen
						name="Register"
						component={SignUpScreen}
						options={{ headerShown: false, gestureEnabled: true }}
					/>
					<Stack.Screen
						name="Landing"
						options={{ headerShown: false, gestureEnabled: false }}
					>
						{() => {
							return (
								<PatientsProvider>
									<LandingScreen />
								</PatientsProvider>
							);
						}}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
