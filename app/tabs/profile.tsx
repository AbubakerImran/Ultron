import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const profile = () => {

    const logout = async () => {
            await AsyncStorage.removeItem('loggedInUser');
            await signOut(auth);
            router.replace('/');
        };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <Image source={require('../../assets/images/profile.png')} style={styles.image} resizeMode="center" />
            <View style={styles.buttonview}>
                <TouchableOpacity style={styles.button} onPress={() => {router.navigate('/(profile)/personalinfo')}}><Text style={styles.buttontext}>Personal Information</Text></TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.logoutbutton}><Text style={styles.logouttext}>Logout</Text></TouchableOpacity>
            </View>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        marginTop: 30
    },
    buttonview: {
        marginTop: 30
    },
    buttontext: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20
    },
    button: {
        width: 208,
        marginVertical: 10
    },
    logouttext: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20,
        color: 'red'
    },
    logoutbutton: {
        width: 83,
        marginVertical: 10,
    },
});

export default profile;