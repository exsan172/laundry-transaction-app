import React, { useState } from "react"
import Modal from "react-native-modal";
import { useRecoilState } from "recoil"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { DatePicker } from 'react-native-woodpicker'
import { selectDate } from '../store'

const SelectDate = (props) => {
    const [message, setMessage]   = useRecoilState(selectDate)
    const [dateFrom, setDateFrom] = useState("")

    return (
        <Modal isVisible={message !== false ? true : false} animationInTiming={500} animationOutTiming={600} backdropOpacity={0.4}>
            <View style={{ backgroundColor:'#ffffff', marginHorizontal:15, borderRadius:5, padding:5 }}>
                <View style={{ justifyContent:'center', alignItems:'center', marginVertical:10 }}>
                    <Image source={require("../assets/icons/success_icon.png")} style={{ width:50, height:50 }}/>
                </View>
                <View style={{ padding:10, justifyContent:'center', alignItems:'center' }}>
                    <View>
                        <DatePicker 
                            value={dateFrom}
                            onDateChange={setDateFrom}
                            title="Date"
                            style={{borderWidth:1}}
                            />
                    </View>
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

export default SelectDate