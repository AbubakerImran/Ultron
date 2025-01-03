import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('screen').width;

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
            <StatusBar backgroundColor='blue' barStyle='light-content' />
            <View style={styles.productlist}>
                <TouchableOpacity style={styles.productview} onPress={() => {router.navigate('/(home)/product')}}>
                    <Image source={require('../../assets/images/product1.png')} resizeMode='stretch' style={styles.productimage} />
                    <Text style={styles.title}>Product title</Text>
                    <View style={styles.priceview}>
                        <Text style={styles.price}><Text style={styles.currency}>Rs.</Text>200</Text>
                        <Text style={styles.delprice}>Rs.300</Text>
                    </View>
                    <View style={styles.rating}>
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productview}>
                    <Image source={require('../../assets/images/product1.png')} resizeMode='stretch' style={styles.productimage} />
                    <Text style={styles.title}>Product title</Text>
                    <View style={styles.priceview}>
                        <Text style={styles.price}><Text style={styles.currency}>Rs.</Text>200</Text>
                        <Text style={styles.delprice}>Rs.300</Text>
                    </View>
                    <View style={styles.rating}>
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                        <MaterialIcons name="star-outline" size={18} color='gold' />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    productlist: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    productview: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: 'blue'
    },
    productimage: {
        width: screenWidth / 2 - 40,
        height: screenWidth / 2 - 40,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        marginLeft: 10
    },
    priceview: {
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'baseline',
    },
    currency: {
        fontWeight: 'bold',
        fontSize: 14
    },
    price: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 5,
    },
    delprice: {
        color: 'grey',
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    rating: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
    },
});

export default home;