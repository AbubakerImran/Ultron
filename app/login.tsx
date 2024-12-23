import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";

const logIn = () => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState('')
    const [success, setsuccess] = useState('red');
    const [securePassword, setSecurePassword] = useState(true);
    const [imagesrc, setimagesrc] = useState(require('../assets/images/hidden.png'));

    const showpass = () => {
        setSecurePassword(false);
        setimagesrc(require('../assets/images/eye.png'));
    };

    const hidepass = () => {
        setSecurePassword(true);
        setimagesrc(require('../assets/images/hidden.png'));
    };

    const handlePlay = () => {
        if (securePassword === true) {
            showpass();
        } else {
            hidepass();
        }
    };

    const handlelogin = async () => {
        if (!Email || !Password) {
            setError('All fields are required');
        } else {
            try {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(Email)) {
                    setError("Please enter a valid email address");
                } else {
                    setError('');
                    setLoading(true);
                    await signInWithEmailAndPassword(auth, Email, Password);
                    const userData = await getDoc(doc(db, "users", Email));
                    const data = userData.data();
                    const saveData = {
                        Email: data?.Email,
                        Phone: data?.Phone,
                        Name: data?.Name
                    };
                    await AsyncStorage.setItem("loggedInUser", JSON.stringify(saveData));
                    router.replace('/tabs/home');
                }
            } catch (error) {
                if (error.code === "auth/invalid-credential") {
                    setError("Email or password is invalid.")
                } else {
                    console.log(error);
                    setError('Unknown error. Try again later');
                }
            } finally {
                setLoading(false);
            }
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <View style={{ justifyContent: 'center' }}>
                    <Image source={require('../assets/images/login icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>WELCOME!</Text>
                    <Text style={styles.heading2}>Log in to continue</Text>
                    <Text style={{ textAlign: 'center', color: success }}>{Error}</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" value={Email} onChangeText={setEmail} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><TouchableOpacity onPress={handlePlay} style={{ position: 'absolute', right: 10, top: 17, zIndex: 2 }}><Image source={imagesrc} style={styles.passVisibilityimg} /></TouchableOpacity><TextInput inputMode="text" secureTextEntry={securePassword} placeholder="Enter your password" autoCapitalize="none" style={styles.input} value={Password} onChangeText={setPassword} /></View>
                        <TouchableOpacity style={styles.resetbutton} onPress={() => { router.navigate('/resetpassword') }}><Text style={styles.resettext}>Reset Password</Text></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handlelogin} >{Loading ? <ActivityIndicator size={27} color='white' /> : <Text style={styles.buttontext}>LOG IN</Text>}</TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
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
        marginVertical: 10,
        width: 250,
        padding: 10
    },
    resetbutton: {
        width: 102,
        alignSelf: 'flex-end'
    },
    resettext: {
        color: 'blue',
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 7,
        width: 150,
        paddingVertical: 10,
        alignSelf: 'center',
        marginVertical: 30
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default logIn;