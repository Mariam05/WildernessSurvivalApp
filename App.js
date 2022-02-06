import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "./app/Screens/LandingScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import { AuthProvider } from "./providers/AuthProvider";
import { PatientsProvider } from "./providers/PatientProvider";

import { VitalsProvider } from "./providers/VitalProvider";

import SignUpScreen from "./app/Screens/SignUpScreen";
import ProfileScreen from "./app/Screens/ProfileScreen";
import PatientScreen from "./app/Screens/PatientScreen";
import MenuScreen from "./app/Screens/MenuScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
					<Stack.Screen
						name="Menu"
						component={MenuScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="Landing"
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					>
						{(props) => {
							const { navigation } = props;
							return (
								<PatientsProvider>
									<LandingScreen navigation={navigation} />
								</PatientsProvider>
							);
						}}
					</Stack.Screen>
					<Stack.Screen
						name="Register"
						component={SignUpScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="Profile"
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					>
						{() => {
							return (
								<PatientsProvider>
									<ProfileScreen />
								</PatientsProvider>
							);
						}}
					</Stack.Screen>
					<Stack.Screen
						name="Patient"
						options={{ headerShown: false, gestureEnabled: false }}
					>
						{(props) => {
							const { navigation, route } = props;
							const { patientId } = route.params;
							return (
								<VitalsProvider patientId={patientId}>
									<PatientScreen
										route={route}
										navigation={navigation}
									/>
								</VitalsProvider>
							);
						}}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
