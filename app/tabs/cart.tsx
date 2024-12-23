import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const cart = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View>
                <Text style={styles.text}>Cart Screen</Text>
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
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    }
});

export default cart;