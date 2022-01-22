import React, { useState } from "react";
import {
    Alert,
    Image, 
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

import { useAuth } from "../../providers/AuthProvider";
import colours from "../assets/colours";
import AppButton from "../assets/components/AppButton";
import globalStyles from "../assets/stylesheet";
import { images } from "../assets/ProfilePics";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
	const lastNameRef = React.createRef<TextInput>();
    const emailRef = React.createRef<TextInput>();
    const passwordRef = React.createRef<TextInput>();
    const confirmRef = React.createRef<TextInput>();

    const navigation = useNavigation();
    
    const [profileImg, setProfileImg] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    
    const { user, emailSignIn, signUp, insertCustomUserData } = useAuth();

    const asyncSignUpWarning = async () => {
        return new Promise<boolean>((response) => {
            Alert.alert("Keep Data?", "Would you like to keep the data thats currently on the device or erase it and start fresh?", [
                {
                    text: "Start Fresh",
                    style: "destructive",
                    onPress: () => {
                        console.log("Losing data");
                        response(false);
                    }
                },
                {
                    text: "Keep Data",
                    style: "default",
                    onPress: () => {
                        console.log("Merging accounts");
                        response(true);
                    }
                },
            ]);
        });
    }

    const onPressSignUp = async () => {
        if (validateInput()) {
            console.log("Trying Sign Up with user: " + username);
            let response = await asyncSignUpWarning();
            try {
                await signUp(username, password);
            } catch (error) {
                const errorMessage = `Failed to sign up: ${error.message}`;
                console.error(errorMessage);
                Alert.alert(errorMessage);
            }
            try {
                response ? await user.linkCredentials(Realm.Credentials.emailPassword(username, password)) : null;
            } catch (error) {
                const errorMessage = `Failed to link: ${error.message}`;
                console.error(errorMessage);
                Alert.alert(errorMessage);
            }
            try {
                const newUser = await emailSignIn(username, password);
                await insertCustomUserData(newUser, profileImg, firstName, lastName);
            } catch (error) {
                const errorMessage = `Failed to sign in: ${error.message}`;
                console.error(errorMessage);
                Alert.alert(errorMessage);
            }
            try {
                navigation.navigate("Landing");
            } catch (error) {
                const errorMessage = `Failed to navigate: ${error.message}`;
                console.error(errorMessage);
                Alert.alert(errorMessage);
            }
        }
    };

    const validateInput = (): boolean => {
        let error = true;
        let specialCharPattern = new RegExp("^(?=.*[-+_!@#$%^&*?]).+$");
        let numericCharPattern = new RegExp("^(?=.*\\d).+$");
        let uppercaseCharPattern = new RegExp("^(?=.*[A-Z]).+$");
        let lowercaseCharPattern = new RegExp("^(?=.*[a-z]).+$");

        if (firstName === "") {
            setFirstNameErrorMessage("Must enter a valid first name");
            error = false;
        }
        if (lastName === "") {
            setLastNameErrorMessage("Must enter a valid last name");
            error = false;
        }
        if (username === "" || username.indexOf("@") < 2 || username.indexOf("@") > username.length - 5 ) {
            setUsernameErrorMessage("Must enter a valid email");
            error = false;
        }
        if (password === "") {
            setPasswordErrorMessage("Must enter a password");
            error = false;
        } 
        if (password.length < 8 || password.length > 24) {
            setPasswordErrorMessage("Must be between 8 and 24 characters long");
            error = false;
        } else if (!lowercaseCharPattern.test(password)) {
            setPasswordErrorMessage("Must contain a lowercase letter");
            error = false;
        } else if (!uppercaseCharPattern.test(password)) {
            setPasswordErrorMessage("Must contain an uppercase letter");
            error = false;
        } else if (!numericCharPattern.test(password)) {
            setPasswordErrorMessage("Must contain a number");
            error = false;
        } else if (!specialCharPattern.test(password)) {
            setPasswordErrorMessage("Must contain at least one of the following: !, @, #, $, %, ^, &, *, -, +, _, ?");
            error = false;
        }
        if (confirmPassword === "") {
            setConfirmPasswordErrorMessage("Must confirm password")
            error = false;
        }
        if (password != confirmPassword) {
            setConfirmPasswordErrorMessage("Passwords do not match");
            error = false;
        }
        return error;
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView
                style={[globalStyles.container, { backgroundColor: colours.blue}]}
            >
                <StatusBar hidden={false} animated={true} backgroundColor={colours.blue} barStyle={"dark-content"} />               
                
                <Text style={registrationStyles.titleText}>Sign Up</Text>

                <KeyboardAvoidingView style={{flex:1, width: "100%"}} behavior={"padding"}>
                    
                    <ScrollView style={registrationStyles.containerScrollView}>
                        <Text style={registrationStyles.subHeading}>Choose an avatar:</Text>
                        <View>
                            <ScrollView
                                horizontal={true}
                                style={{
                                    padding: 5,
                                    height: 80,
                                }}
                            >
                                {images.map((image, index) => (
                                    <TouchableOpacity
                                        onPress={() => setProfileImg(index)}
                                        key={index}
                                    >
                                        <View
                                            style={registrationStyles.profilePicture} 
                                        >
                                            <Image
                                                style={{
                                                    width: "100%",
                                                    height: undefined,
                                                    aspectRatio: 1,
                                                    resizeMode: "cover",
                                                    borderRadius: 100,
                                                    borderWidth: profileImg === index ? 4 : 0,
                                                    borderColor: profileImg === index ? colours.primary : "transparent"
                                                }}
                                                source={image}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        
                        <View style={globalStyles.separator} />
                        
                        <Text style={registrationStyles.subHeading}>Personal Details:</Text>
                        <TextInput
                            style={[globalStyles.credentialInput, {backgroundColor: firstNameErrorMessage ? "tomato" : "white"}]}
                            blurOnSubmit={false}
                            clearButtonMode="while-editing"
                            keyboardType="default"
                            returnKeyType="next"
                            textContentType="username"
                            placeholder="First Name"
                            onChangeText={(text) => {
                                setFirstNameErrorMessage("");
                                setFirstName(text);
                            }}
                            value={firstName}
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            onSubmitEditing={() => { lastNameRef.current.focus(); }}
                        />
                        { firstNameErrorMessage.length > 0 && <Text style={registrationStyles.errorMessage}>{firstNameErrorMessage}</Text>}
                        <TextInput
                            ref={lastNameRef}
                            style={[globalStyles.credentialInput, {backgroundColor: lastNameErrorMessage ? "tomato" : "white"}]}
                            blurOnSubmit={false}
                            clearButtonMode="while-editing"
                            keyboardType="default"
                            returnKeyType="next"
                            textContentType="username"
                            placeholder="Last Name"
                            onChangeText={(text) => {
                                setLastNameErrorMessage("");
                                setLastName(text);
                            }}
                            value={lastName}
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoCompleteType="name"
                            onSubmitEditing={() => { emailRef.current.focus(); }}
                        />
                        { lastNameErrorMessage.length > 0 && <Text style={registrationStyles.errorMessage}>{lastNameErrorMessage}</Text>}
                        
                        <View style={globalStyles.separator} />

                        <Text style={registrationStyles.subHeading}>Login Details:</Text>
                        <TextInput
                            ref={emailRef}
                            blurOnSubmit={false}
                            style={[globalStyles.credentialInput, {backgroundColor: usernameErrorMessage ? "tomato" : "white"}]}
                            clearButtonMode="while-editing"
                            keyboardType="email-address"
                            returnKeyType="next"
                            textContentType="username"
                            placeholder="Email"
                            onChangeText={(text) => {
                                setUsernameErrorMessage("");
                                setUsername(text);
                            }}
                            value={username}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="email"
                            onSubmitEditing={() => { passwordRef.current.focus(); }}
                        />
                        { usernameErrorMessage.length > 0 && <Text style={registrationStyles.errorMessage}>{usernameErrorMessage}</Text>}
                        <TextInput
                            ref={passwordRef}
                            style={[globalStyles.credentialInput, {backgroundColor: passwordErrorMessage ? "tomato" : "white"}]}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            secureTextEntry={true}
                            textContentType="password"
                            placeholder="Password"
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="password"
                            onChangeText={(text) => {
                                setPasswordErrorMessage("");
                                setPassword(text);
                            }}
                            onSubmitEditing={() => { confirmRef.current.focus() }}
                        />
                        { passwordErrorMessage.length > 0 && <Text style={registrationStyles.errorMessage}>{passwordErrorMessage}</Text>}
                        <TextInput
                            ref={confirmRef}
                            style={[globalStyles.credentialInput, {backgroundColor: confirmPasswordErrorMessage ? "tomato" : "white"}]}
                            blurOnSubmit={false}
                            returnKeyType="done"
                            secureTextEntry={true}
                            textContentType="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="password"
                            onChangeText={(text) => {
                                setConfirmPasswordErrorMessage("");
                                setConfirmPassword(text);
                            }}
                            onSubmitEditing={onPressSignUp}
                        />
                        { confirmPasswordErrorMessage.length > 0 && <Text style={registrationStyles.errorMessage}>{confirmPasswordErrorMessage}</Text>}
                    <View style={globalStyles.separator} />
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{height: Platform.OS === "ios" ? "5%" : "9%"}}/>
                
                <AppButton
                    title="Sign Up"
                    style={registrationStyles.signUpButton}
                    buttonTextStyle={registrationStyles.signUpButtonText}
                    onPress={onPressSignUp}
                />

                <AppButton
                    title="Back"
                    onPress={() => {
                        navigation.goBack();
                        console.log("Going Back!");
                    }}
                    style={registrationStyles.backButton}
                    buttonTextStyle={registrationStyles.backButtonText} />
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const registrationStyles = StyleSheet.create({
	backButton: {
		flexDirection: "column",
		height: "5%",
		width: "15%",
		maxWidth: 100,
		margin: 12,
		backgroundColor: colours.pinkBackground,
		borderWidth: 0,
		borderRadius: 20,
		alignContent: "center",
		justifyContent: "center",
		position: "absolute",
		top: Platform.OS === "ios" ? 45 : 0,
		left: 10,
		shadowColor: colours.primary,
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
		elevation: 6,
	},
	backButtonText: {
		fontSize: 17,
		color: colours.primary,
		alignSelf: "center",
    },
    containerScrollView: {
        top: 0,
        paddingTop: 20,
        paddingBottom: 15,
    },
    errorMessage: {
        color: "red",
        left: "10%",
        width: "80%",
        fontSize: 15,
        fontWeight: "400",
        marginTop: -10
    },
    profilePicture: {
		alignContent: "center",
		justifyContent: "center",
		marginLeft: 0,
		marginRight: 15,
		borderRadius: 100,
		backgroundColor: colours.secondary,
		height: "95%",
		aspectRatio: 1,
		shadowColor: colours.primary,
		shadowOpacity: 0.8,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
        elevation: 5,
    },
    titleText: {
		top: Platform.OS === "ios" ?  0 : 0,
        fontSize: 40,
        fontWeight: "500",
        textAlign: "center",
        fontFamily: "Oxygen_700Bold",
    },
    signUpButton: {
        position: "absolute",
        bottom: "5%",
		flexDirection: "column",
		height: "5%",
		width: "85%",
		maxWidth: 350,
		margin: 12,
		backgroundColor: colours.green,
		borderWidth: 0,
		borderRadius: 25,
		alignContent: "center",
		justifyContent: "center",
		shadowColor: colours.primary,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 3,
        elevation: 4,
    },
    signUpButtonText: {
		fontSize: 20,
		color: colours.primary,
        alignSelf: "center",
    },
    subHeading: {
        fontSize: 25,
        fontWeight: "100",
        textAlign: "left",
        fontFamily: "Oxygen_700Bold",
        left: 20
    },
});
