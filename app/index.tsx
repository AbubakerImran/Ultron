import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const main = () => {

    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const loggedInUser = await AsyncStorage.getItem("loggedInUser");
            if (loggedInUser) {
                router.replace("/tabs/home");
            } else {
                setLoading(false);
            }
        };
        const timeOut = setTimeout(checkLoggedIn, 1500);
        return () => clearTimeout(timeOut);
    }, []);

    if (Loading) {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='blue' barStyle='light-content' />
                <ActivityIndicator color='blue' size={50} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='blue' barStyle='light-content' />
            <View>
                <Image source={require('../assets/images/main icon.jpg')} style={styles.image} resizeMode="center" />
                <TouchableOpacity style={styles.loginbutton} onPress={() => { router.navigate('/login') }}><Text style={styles.logintext}>LOG IN</Text></TouchableOpacity>
                <TouchableOpacity style={styles.signupbutton} onPress={() => { router.navigate('/signup') }}><Text style={styles.signuptext}>SIGN UP</Text></TouchableOpacity>
            </View>
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
        marginBottom: 40
    },
    loginbutton: {
        backgroundColor: 'blue',
        borderRadius: 7,
        borderWidth: 3,
        borderColor: 'blue',
        paddingVertical: 10,
        width: 190,
        alignSelf: 'center',
        marginVertical: 10
    },
    signupbutton: {
        backgroundColor: 'white',
        borderRadius: 7,
        borderWidth: 3,
        borderColor: 'blue',
        paddingVertical: 10,
        width: 190,
        alignSelf: 'center',
        marginVertical: 10
    },
    logintext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    signuptext: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default main;