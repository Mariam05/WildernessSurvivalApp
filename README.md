# Wilderness Survival Application

## Installation
1. Run ```yarn install``` -- installs all required packages declared in package.json
2. In separate terminal run ```npx react-native start``` -- starts a metro server to host the app (allows real-time updates)

### Android
3. Run ```npx expo-cli run:android`` -- this should package everything and FAIL.     
4. Open the "android" directory in Android Studio    
5. Android studio should install necessary libraries and index the project, allowing you to run the app on a simulator (or possibly a real device?)    

### iOS
3. Run ```npx expo-cli run:ios``` -- this should package everything, install cocoapods and SUCCEED
4. Once succeeded, it should automatically open an iOS simulator and run

## Using the app
1. Enter email (dummy or real) and password
2. If you haven't created an account yet, login should fail, click the "Register" button instead, this will create an account with the entered credentials
3. Login
4. Add patients with the "+" button, no fields are required
5. Pressing "logout" will log you out. 
6. Pressing the profile icon (top right) will print your userID (from DB) in the log, we will probably need this later
7. Closing the app does NOT log you out

## Known Bugs
1. IDK whats going on with the statusbar colour and why it doesnt always display properly
2. No encryption yet, Mongodb does provide services for this and I'll look into it