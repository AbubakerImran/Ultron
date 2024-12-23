import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const profile = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserEmail = async () => {
            const loggedInUser = await AsyncStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setUserData(JSON.parse(loggedInUser));
            }
        };
        fetchUserEmail();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem('loggedInUser');
        await signOut(auth);
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View>
                <Text style={styles.text}>Name: {userData?.Name}</Text>
                <Text style={styles.text}>Email: {userData?.Email}</Text>
                <Text style={styles.text}>Phone: {userData?.Phone}</Text>
                <TouchableOpacity onPress={logout} style={styles.button}><Text style={styles.logouttext}>Logout</Text></TouchableOpacity>
            </View>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    passVisibilityimg: {
        width: 28,
        height: 28
    },
    text: {
        borderBottomWidth: 3,
        borderBottomColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        width: 250,
        padding: 5,
        color: 'black'
    },
    logouttext: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 7,
        width: 120,
        paddingVertical: 7,
        alignSelf: 'center',
        marginVertical: 20
    },
});

export default profile;