import React, { useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import PhoneInput from "react-native-phone-number-input";

const signUp = () => {

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Phone, setPhone] = useState('');
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState('');
    const [success, setsuccess] = useState('red');
    const [securePassword, setSecurePassword] = useState(true);
    const [imagesrc, setimagesrc] = useState(require('../assets/images/hidden.png'));
    
    const phoneInput = useRef<PhoneInput>(null);

    const showpass = () => {
        setSecurePassword(false);
        setimagesrc(require('../assets/images/eye.png'));
    };

    const hidepass = () => {
        setSecurePassword(true);
        setimagesrc(require('../assets/images/hidden.png'));
    };

    const handlePlay = () => {
        if (securePassword) {
            showpass();
        } else {
            hidepass();
        }
    };

    const handlesignup = async () => {
        if (!Name || !Email || !Password || !Phone) {
            setError('All Fields are required.');
        } else {
            try {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(Email)) {
                    setError("Please enter a valid email address.");
                } else {
                    const checkValid = phoneInput.current?.isValidNumber(Phone) ?? false;
                    if (!checkValid) {
                        setError("Enter a valid number with this country code.");
                    } else {
                        const Phone = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
                        if (Password.length < 8) {
                            setError("Password must be at least 8 characters long.");
                        } else {
                            setError('');
                            setLoading(true);
                            await createUserWithEmailAndPassword(auth, Email, Password);
                            const user = auth.currentUser;
                            await sendEmailVerification(user);
                            await setDoc(doc(db, "users", user?.uid), { Name, Email, Phone });
                            await signOut(auth);
                            setError('Account successfully created.');
                            setsuccess('green');
                        };
                    };
                };
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    setError("Account already exist with this email.");
                    setsuccess("red")
                } else {
                    if (error.code === 'auth/network-request-failed') {
                        setError('Please check your internet connection and try again.');
                        setsuccess("red")
                    } else {
                        setError('Error creating account. Try again later.');
                        console.log(error)
                        setsuccess('red');
                    };
                };
            } finally {
                setLoading(false);
            };
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                <View style={{ justifyContent: 'center' }}>
                    <Image source={require('../assets/images/signup icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>Hi!</Text>
                    <Text style={styles.heading2}>Create a new account</Text>
                    <Text style={{ textAlign: 'center', color: success }}>{Error}</Text>
                    <TextInput inputMode='text' placeholder="Full Name" style={styles.input} autoCapitalize="words" value={Name} onChangeText={setName} />
                    <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" value={Email} onChangeText={setEmail} />
                    <PhoneInput ref={phoneInput} defaultCode="PK" onChangeFormattedText={setPhone} layout="second" containerStyle={{width: 250, alignSelf: 'center', borderBottomWidth: 3, borderBottomColor: 'grey', marginBottom: 10, marginTop: 5, padding: 10}} textContainerStyle={{paddingVertical: 0, backgroundColor: 'white', paddingHorizontal: 0}} codeTextStyle={{width: 40, fontSize: 14}} countryPickerButtonStyle={{width: 80}} textInputStyle={{fontSize: 14}} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}><TouchableOpacity onPress={handlePlay} style={{ position: 'absolute', right: 30, top: 17, zIndex: 2 }}><Image source={imagesrc} style={styles.passVisibilityimg} /></TouchableOpacity><TextInput inputMode="text" secureTextEntry={securePassword} placeholder="Enter your password" autoCapitalize="none" style={styles.input} value={Password} onChangeText={setPassword} /></View>
                    <TouchableOpacity style={styles.button} onPress={handlesignup}>{Loading ? <ActivityIndicator size={27} color='white' /> : <Text style={styles.buttontext}>SIGN UP</Text>}</TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 200,
    },
    passVisibilityimg: {
        width: 28,
        height: 28
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 38,
        marginBottom: 10
    },
    heading2: {
        fontWeight: '500',
        fontSize: 24,
        color: 'grey',
        marginBottom: 30
    },
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'grey',
        alignSelf: 'center',
        marginVertical: 10,
        width: 250,
        padding: 10,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 7,
        width: 150,
        paddingVertical: 10,
        alignSelf: 'center',
        marginVertical: 20
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default signUp;