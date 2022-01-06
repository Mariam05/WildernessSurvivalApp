import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./app/Screens/LandingScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import PatientScreen from "./app/Screens/PatientScreen";

import { AuthProvider } from "./providers/AuthProvider";
import { PatientsProvider } from "./providers/PatientProvider";
import { VitalsProvider } from "./providers/VitalProvider";

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

					<Stack.Screen
                        name="Patient"
                        options={{ headerShown: false, gestureEnabled: false }}
                    >
                        {(props) => {

                            const { route } = props;
                            const { id, name, vitals } = route.params;
                            return (
                                <PatientsProvider>
                                    <VitalsProvider partition={id}>
                                        <PatientScreen route={route} />
                                    </VitalsProvider>
                                </PatientsProvider>
                            );
                        }}
                    </Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
