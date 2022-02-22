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
import RecordVitalsStack from "./app/Screens/RecordVitalsScreen";
import MenuScreen from "./app/Screens/MenuScreen";
import HomeScreen from "./app/Screens/HomeScreen";
import QuickReferenceScreen from "./app/Screens/ResourceScreens/QuickReferenceScreen";
import AssessmentScreen from "./app/Screens/ResourceScreens/AssessmentScreen";
import AnatomyScreen from "./app/Screens/ResourceScreens/AnatomyScreen";
import HowToScreen from "./app/Screens/ResourceScreens/HowToScreen";
import ChecklistScreen from "./app/Screens/ResourceScreens/ChecklistScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
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
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
							gestureEnabled: false,
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
					<Stack.Screen
						name="RecordVitals"
						options={{ headerShown: false, gestureEnabled: false }}
					>
						{(props) => {
						const { navigation, route } = props;
						const { patientId } = route.params;
						return (
							<VitalsProvider patientId={patientId}>
							<RecordVitalsStack route={route} navigation={navigation} />
							</VitalsProvider>
						);
						}}
					</Stack.Screen>
					<Stack.Screen
						name="QuickReference"
						component={QuickReferenceScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="Assessments"
						component={AssessmentScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="Anatomy"
						component={AnatomyScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="HowTo"
						component={HowToScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
					<Stack.Screen
						name="Checklists"
						component={ChecklistScreen}
						options={{
							headerShown: false,
							gestureEnabled: true,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</AuthProvider>
	);
}
