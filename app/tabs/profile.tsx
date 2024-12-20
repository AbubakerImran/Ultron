import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const profile = () => {

    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState(null);
    const [showpassword, setshowpassword] = useState('•••••••••');
    const [imagesrc, setimagesrc] = useState(require('../../assets/images/hidden.png'));
    const [visible, setvisible] = useState(true);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserEmail = async () => {
            const loggedInUser = await AsyncStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setEmail(JSON.parse(loggedInUser));
            }
        };
        fetchUserEmail();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const User = await getDoc(doc(db, "users", email));
            setUserData(User.data());
            setLoading(false);
        };
        fetchUserData();
    }, [email]);

    const logout = async () => {
        await AsyncStorage.removeItem('loggedInUser');
        router.replace('/')
    };

    const showpass = () => {
        setvisible(false);
        setshowpassword(userData?.Password);
        setimagesrc(require('../../assets/images/eye.png'));
    };

    const hidepass = () => {
        setvisible(true);
        setshowpassword('•••••••••');
        setimagesrc(require('../../assets/images/hidden.png'));
    };

    const handlePlay = () => {
        if (visible === true) {
            showpass();
        } else {
            hidepass();
        }
    };

    return (Loading ?
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            <ActivityIndicator color='black' size={50} />
        </SafeAreaView> :
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View>
                <Text style={styles.text}>Name: {userData?.Name}</Text>
                <Text style={styles.text}>Email: {userData?.Email}</Text>
                <Text style={styles.text}>Phone: {userData?.Phone}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}><TouchableOpacity style={{ position: 'absolute', right: 10, top: 15, zIndex: 2 }} onPress={handlePlay}><Image source={imagesrc} style={styles.passVisibilityimg} /></TouchableOpacity><TextInput inputMode="text" editable={false} style={styles.text} value={"Password: " + showpassword} /></View>
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