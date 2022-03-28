import React from "react"
import { View, StyleSheet, Image } from "react-native"

const WaveComponents = () => {
    return (
        <View style={style.container}>
            <Image source={require("../assets/images/wave_bottom.png")} style={{ height:110 }}/>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

})

export default WaveComponents