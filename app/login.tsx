import { router } from "expo-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

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
                setError('');
                setLoading(true);
                const checkUser = doc(db, "users", Email);
                const User = await getDoc(checkUser);
                if (User.exists()) {
                    const userData = User.data();
                    if (userData.Password === Password) {
                        setError('Successfully logged in');
                        setsuccess('green');
                        router.replace('/tabs/home');
                        const user = User;
                    } else {
                        setError('Incorrect password');
                        setsuccess('red');
                    }
                } else {
                    setError('User does not exist. Create a new account');
                    setsuccess('red');
                }
            } catch (e) {
                console.log(e);
                setError('Unknown error. Try again later');
            } finally {
                setLoading(false);
            }
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <View>
                    <Image source={require('../assets/images/login icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>WELCOME!</Text>
                    <Text style={styles.heading2}>Log in to continue</Text>
                    <Text style={{ textAlign: 'center', color: success }}>{Error}</Text>
                    <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" value={Email} onChangeText={setEmail} />
                    <View style={{ flexDirection: 'row' }}><TouchableOpacity onPress={handlePlay} style={{ position: 'absolute', right: 30, top: 17, zIndex: 2 }}><Image source={imagesrc} style={styles.passVisibilityimg} /></TouchableOpacity><TextInput inputMode="text" secureTextEntry={securePassword} placeholder="Enter your password" autoCapitalize="none" style={styles.input} value={Password} onChangeText={setPassword} /></View>
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
        justifyContent: 'center',
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
        marginHorizontal: 'auto',
        marginVertical: 10,
        width: 250,
        padding: 10
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 7,
        width: 150,
        paddingVertical: 10,
        marginHorizontal: 'auto',
        marginVertical: 50
    },
    buttontext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default logIn;