import React, { useEffect } from "react";
import { BackHandler, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const home = () => {
    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    }
    );
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <View>
                <Text style={styles.text}>Home Screen</Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    }
});

export default home;