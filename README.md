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
***NOTE:*** Closing the app does NOT logout the current user
### Logging in
1. Click on option in login screen
2. Enter info when prompted if "Login" or "Register" was clicked
3. If "Continue without account" was selected, an anonymous user will be created and used
4. You will be navigated to the Landing screen
### Landing Screen
1. Add patients with the "+" button, a new default patient will be created
2. A pop-up will appear for the user to select to either return to the previous screen, start recording vitals, or edit patient details 
3. Pressing the gear in the top left will take you to the settings menu.
4. Pressing the "i" on a patient item will take you to their detailed patient page
5. Pressing any other part of the patient will initiate the "quick vitals" process 
### Patient Page
1. View patient options by pressing the "i" in the top right 
2. Add custom vitals by pressing the "+" button
3. (**TODO**) Add new recordings of specific vitals by pressing the apprpriate "Add" button
4. (**TODO**) View vital-specific information by pressing the appropriate "i" button
5. (**TODO**) View graphs of data by pressing the appropriate vital category
6. (**TODO**) Delete a vital category by ...
### Quick Vitals
When the quick vitals process is initiated:
1. You will be prompted through a process for recording each core-vital
2. For categorical vitals, large buttons are presented
3. For time-related vitals, a preparation timer and countdown timer are provided to assist in collecting the reading
4. (**TODO**) You can skip any vital recording by pressing "Skip"
5. (**TODO**) You can go back and retake a vital by pressing "Retake"
### Settings Page
1. You can login to an account through this page (if not already logged in)
2. You can logout (if logged in)
3. User information can be edited through the user settings page (if logged in)
4. Static resources can be viewed for reference to wilderness first aid
5. Checklists are available to keep track of wilderness survival items

## Known Downfalls
1. No encryption yet, Mongodb does provide services for this and it will be looked into once app is functional without encryption
