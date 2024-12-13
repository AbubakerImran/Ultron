import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native"

const Signup = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },
});

export default Signup;