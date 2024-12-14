import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const signUp = () => {

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState('');
    const [success, setsuccess] = useState('red');

    const handlesignup = async () => {
        if (!Name || !Email || !Password) {
            setError('All Fields are required');
        } else {
            try {
                setError('');
                setLoading(true);
                const checkUser = doc(db, "users", Email);
                const User = await getDoc(checkUser);
                if (User.exists()) {
                    setError("User already exist with this email");
                    setsuccess("red");
                } else {
                    await setDoc(doc(db, "users", Email), { Name, Email, Password });
                    setError('Account successfully created');
                    setsuccess('green');
                }
            } catch (e) {
                console.log(e);
                setError('Error creating account. Try again later');
            } finally {
                setLoading(false);
            }
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                <View>
                    <Image source={require('../assets/images/signup icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>Hi!</Text>
                    <Text style={styles.heading2}>Create a new account</Text>
                    <Text style={{ textAlign: 'center', color: success }}>{Error}</Text>
                    <TextInput inputMode='text' placeholder="Full Name" style={styles.input} autoCapitalize="words" value={Name} onChangeText={setName} />
                    <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" value={Email} onChangeText={setEmail} />
                    <TextInput inputMode='text' placeholder="Enter your password" secureTextEntry={true} style={styles.input} autoCapitalize="none" value={Password} onChangeText={setPassword} />
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
        backgroundColor: 'white'
    },
    image: {
        width: 300,
        height: 200,
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
        width: 250
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

export default signUp;