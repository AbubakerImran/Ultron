import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('screen').width;

const product = () => {

    const image1 = require('../../assets/images/product1.png');
    const image2 = require('../../assets/images/product2.png')

    const [image, setImage] = useState(image1);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(false);
    const [favourite, setFavourite] = useState(false);

    const next = () => {
        setImage(image2);
        setLast(true);
        setFirst(false);
    };

    const prev = () => {
        setImage(image1);
        setFirst(true);
        setLast(false);
    };

    const handlefavourite = () => {
        if(!favourite) {
            setFavourite(true);
        } else {
            setFavourite(false);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='blue' barStyle='light-content'/>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 65}}>
                <View style={styles.imageview}>
                    <Image source={image} resizeMode='stretch' style={styles.image} />
                    <View style={styles.buttonview}>
                        <TouchableOpacity onPress={prev} style={styles.button}>{ first ? <Text></Text> :<MaterialIcons name="navigate-before" size={50} color="blue" />}</TouchableOpacity>
                        <TouchableOpacity onPress={next} style={styles.button}>{ last ? <Text></Text> : <MaterialIcons name="navigate-next" size={50} color="blue" style={{textAlign: 'right'}}/>}</TouchableOpacity>
                    </View>
                </View>
                <View style={styles.pricecontainer}>
                    <View style={styles.priceview}>
                        <Text style={styles.price}><Text style={styles.currency}>Rs. </Text>200</Text>
                        <Text style={styles.delprice}><Text style={styles.delcurrency}>Rs. </Text>300</Text>
                    </View>
                    <TouchableOpacity style={styles.favbutton} onPress={handlefavourite}><MaterialIcons name={favourite ? 'star' : 'star-outline'} size={30} color='blue' /></TouchableOpacity>
                </View>
                <Text style={styles.title}>Product title</Text>
                <View style={styles.ratingview}>
                    <MaterialIcons name="star-outline" size={30} color='gold'/>
                    <MaterialIcons name="star-outline" size={30} color='gold' />
                    <MaterialIcons name="star-outline" size={30} color='gold' />
                    <MaterialIcons name="star-outline" size={30} color='gold' />
                    <MaterialIcons name="star-outline" size={30} color='gold' />
                </View>
                <Text style={styles.descriptiontitle}>Description:</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita cumque cupiditate officia magnam maxime, minima labore mollitia et ipsa saepe. Dolore ullam dicta id animi at et quam suscipit quibusdam facere nulla dolorum fugit vel atque, voluptatum, alias ipsam natus? Molestiae aliquam quas excepturi eum quisquam modi earum sunt assumenda ullam magnam. Quas assumenda omnis natus, illo doloribus impedit atque ullam autem doloremque deleniti expedita aut aliquam excepturi adipisci esse, quaerat harum. Consequuntur tempore eius assumenda sed pariatur officia! Necessitatibus.</Text>
                {/* review and rating */}
                {/* other product */}
            </ScrollView>
            <View style={styles.tabview}>
                <TouchableOpacity style={styles.buybutton}><Text style={styles.buytext}>Buy Now</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cartbutton}><Text style={styles.carttext}>Add to Cart</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageview: {
        position: 'relative',
        justifyContent: 'center'
    },
    image: {
        width: screenWidth,
        height: screenWidth,
        backgroundColor: 'lightgrey',
    },
    buttonview: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        width: screenWidth,
    },
    button: {
        width: 35,
    },
    pricecontainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20
    },
    priceview: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    favbutton: {
        alignSelf: 'center'
    },
    currency: {
        fontSize: 20,
    },
    delcurrency: {
        fontSize: 16,
    },
    price: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '600',
        color: 'blue',
        marginLeft: 20,
        marginRight: 5
    },
    delprice: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        textDecorationLine: 'line-through',
        color: 'grey',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 20,
        marginVertical: 10
    },
    ratingview: {
        flexDirection: 'row',
        marginLeft: 20,
        marginVertical: 10
    },
    descriptiontitle: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 20,
        marginVertical: 10
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    tabview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'blue',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: screenWidth,
    },
    buybutton: {
        backgroundColor: 'blue',
        width: 140,
        paddingHorizontal: 25,
        paddingVertical: 7,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'blue',
    },
    cartbutton: {
        backgroundColor: 'white',
        width: 140,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'blue',
    },
    buytext: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    carttext: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold'
    },
});

export default product;