import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

    const getToken = async () => {
        console.log("token => ", await AsyncStorage.getItem('token_key'));
    }
    
    return (
        <TouchableOpacity onPress={() => getToken()}>
            <View>
                <Text>HomeScreen</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HomeScreen