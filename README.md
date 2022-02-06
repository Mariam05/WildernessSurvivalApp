# Wilderness Survival Application

## Installation
1. Run ```yarn install``` -- installs all required packages declared in package.json
2. In separate terminal run ```npx react-native start``` -- starts a metro server to host the app (allows real-time updates)

### Android
3. Run ```npx expo-cli run:android``` -- this should package everything and FAIL.     
4. Open the "android" directory in Android Studio    
5. Android studio should install necessary libraries and index the project, allowing you to run the app on a simulator (or possibly a real device?)    

### iOS
3. Run ```npx expo-cli run:ios``` -- this should package everything, install cocoapods and SUCCEED
4. Once succeeded, it should automatically open an iOS simulator and run

## Using the app
1. Click on option in login screen
2. Enter info when prompted if "Login" or "Register" was clicked
3. Add patients with the "+" button, no fields are required
4. Pressing the gear in the top right will take you to the settings menu.
5. Pressing the "i" on a patient item will take you to their detailed patient page
6. Pressing any other part of the patient will initiate the "quick vitals" process 
7. Closing the app does NOT log you out

## Known Bugs
1. No encryption yet, Mongodb does provide services for this and I'll look into it
