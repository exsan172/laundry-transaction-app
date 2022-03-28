import React from "react"
import Modal from "react-native-modal";
import { useRecoilState } from "recoil"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { alertError } from '../store'

const AlertError = (props) => {
    const [message, setMessage] = useRecoilState(alertError)

    return (
        <Modal isVisible={message !== false ? true : false} animationInTiming={500} animationOutTiming={600}>
            <View style={{ backgroundColor:'#ffffff', marginHorizontal:15, borderRadius:5, padding:5 }}>
                <View style={{ justifyContent:'center', alignItems:'center', marginVertical:10 }}>
                    <Image source={require("../assets/icons/error_icon.png")} style={{ width:50, height:50 }}/>
                </View>
                <View style={{ padding:10, justifyContent:'center', alignItems:'center' }}>
                    <Text>{message}</Text>
                </View>
                <View style={{padding:10}}>
                    <TouchableOpacity onPress={() => setMessage(false)} style={{backgroundColor:'#54AEEA', padding:10, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:12}}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AlertError