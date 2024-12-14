import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native"

const signUp = () => {

    const [Error, setError] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                <View>
                    <Image source={require('../assets/images/signup icon.jpg')} style={styles.image} resizeMode="center" />
                    <Text style={styles.heading}>Hi!</Text>
                    <Text style={styles.heading2}>Create a new account</Text>
                    <Text>{Error}</Text>
                    <TextInput inputMode='text' placeholder="Full Name" style={styles.input} autoCapitalize="words" />
                    <TextInput inputMode='email' placeholder="Enter your email" style={styles.input} autoCapitalize="none" />
                    <TextInput inputMode='text' placeholder="Enter your password" secureTextEntry={true} style={styles.input} autoCapitalize="words" />
                    <TouchableOpacity style={styles.button}><Text style={styles.buttontext}>SIGN UP</Text></TouchableOpacity>
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