import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

const personalinfo = () => {

    const [Loading, setLoading] = useState(true);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState(null);
    const [Phone, setPhone] = useState(null);
    const [Password, setPassword] = useState('');
    const [NewPassword, setNewPassword] = useState(null);
    const [securePassword, setSecurePassword] = useState(true);
    const [imagesrc, setimagesrc] = useState(require('../../assets/images/hidden.png'));
    const [buttonLoading, setbuttonLoading] = useState(false);
    const [Error, setError] = useState('');
    const [success, setSuccess] = useState('red');
    
    const showpass = () => {
        setSecurePassword(false);
        setimagesrc(require('../../assets/images/eye.png'));
    };
    
    const hidepass = () => {
        setSecurePassword(true);
        setimagesrc(require('../../assets/images/hidden.png'));
    };

    const handlePlay = () => {
        if (securePassword === true) {
            showpass();
        } else {
            hidepass();
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserEmail = async () => {
                const loggedInUser = await AsyncStorage.getItem('loggedInUser');
                const uid = JSON.parse(loggedInUser);
                const Data = await getDoc(doc(db, "users", uid));
                setName(Data.data()?.Name);
                setEmail(Data.data()?.Email);
                setPhone(Data.data()?.Phone.formattedNumber);
                setLoading(false);
            };
            fetchUserEmail();
        }, [])
    );

    const changeinfo = async() => {
        setError('');
        setSuccess('red')
        if(!Password) {
            setError('Please enter your old password.')
        } else if(Password) {
            setError('')
            try {
                setbuttonLoading(true);
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(Email, Password);
                await reauthenticateWithCredential(user, credential);
                const userId = auth.currentUser?.uid;
                if(!NewPassword) {
                    updateDoc(doc(db, "users", userId), {
                        Name: Name,
                    } );
                    setSuccess('green');
                    setError('Succesfully updated information.');
                } else if(NewPassword) {
                    updateDoc(doc(db, "users", userId), {
                        Name: Name,
                    });
                    setSuccess('green');
                    setError('Successfully updated information.');
                    await updatePassword(user, NewPassword);
                };
            } catch(error) {
                if (error.code === "auth/invalid-credential") {
                    setError('Incorrect old password.');
                } else if (error.code === "auth/too-many-requests") {
                    setError('Too many requests. Try again later.');
                } else {
                    setError('Unknown error occured. Try again later.');
                }
            } finally {
                setbuttonLoading(false);
            };
        };
    };
    
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content'/>
            { Loading ?
            <ActivityIndicator color='blue' size={50}/> :
                <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={require('../../assets/images/personalinfo.png')} style={styles.image} resizeMode="center" />
            <View>
                <Text style={styles.header}>Personal Information</Text>
                <Text style={{textAlign: 'center', color: success}}>{Error}</Text>
                <TextInput style={styles.input} inputMode="text" autoCapitalize="words" value={Name} onChangeText={setName} placeholder="Enter your full name" />
                <TextInput style={styles.input} value={Email} editable={false} placeholder="Enter your email" />
                <TextInput style={styles.input} value={Phone} editable={false} placeholder="Enter your phone number"/>
                <TextInput style={styles.input} inputMode="text" secureTextEntry={true} autoCapitalize="none" value={Password} onChangeText={setPassword} placeholder="Enter old password" />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}><TouchableOpacity onPress={handlePlay} style={{ position: 'absolute', top: 15, zIndex: 2, right: 10 }}><Image source={imagesrc} style={styles.passVisibilityimg} /></TouchableOpacity><TextInput inputMode="text" secureTextEntry={securePassword} placeholder="Enter new password" autoCapitalize="none" style={styles.input} value={NewPassword} onChangeText={setNewPassword} /></View>
                <TouchableOpacity style={styles.button} onPress={changeinfo}>{ buttonLoading ? <ActivityIndicator color='white' size={27} /> : <Text style={styles.buttontext}>Change Info</Text>}</TouchableOpacity>
            </View>
            </ScrollView>}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: 'center'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 3,
        borderBottomColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        width: 250,
        padding: 5,
        color: 'black'
    },
    passVisibilityimg: {
        width: 28,
        height: 28
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
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
});

export default personalinfo;