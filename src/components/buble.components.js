import React from "react"
import { View, StyleSheet, Image } from "react-native"

const BubleComponents = () => {
    return (
        <View style={style.container}>
            <Image source={require("../assets/images/bubble_left.png")} style={{ position:'absolute', left:70, top:10, width:30, height:30}}/>
            <Image source={require("../assets/images/bubble_right.png")} style={{ position:'absolute', right:0, top:0, width:80, height:80}}/>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        position:'relative'
    },

})

export default BubleComponents