import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { auth, db } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const logIn = () => {

    const [Email, setEmail] = useState('');
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState('')
    const [success, setsuccess] = useState('red');

    const handleresetpassword = async () => {
        setError('');
        if (!Email) {
            setError("Please enter your email first.")
        } else {
            try {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(Email)) {
                    setError("Please enter a valid email address.");
                } else {
                    setLoading(true);
                    const user = await getDoc(doc(db, "users", Email));
                    if (user.exists()) {
                        await sendPasswordResetEmail(auth, Email);
                        setsuccess('green');
                        setError("Email sent. Check your email to reset password.");
                    } else {
                        setError("Account does not exist on this email.")
                    }
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <View style={{ marginTop: 70 }}>
                    <Image source={require('../assets/images/login icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>Reset Password</Text>
                    <Text style={{ textAlign: 'center', color: success }}>{Error}</Text>
                    <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" value={Email} onChangeText={setEmail} />
                    <TouchableOpacity style={styles.button} onPress={handleresetpassword} >{Loading ? <ActivityIndicator size={22} color='white' /> : <Text style={styles.buttontext}>Reset Password</Text>}</TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        fontWeight: '500',
        fontSize: 24,
        color: 'black',
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'grey',
        marginVertical: 10,
        alignSelf: 'center',
        width: 250,
        padding: 10
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
        fontSize: 16
    }
});

export default logIn;