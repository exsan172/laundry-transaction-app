import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native'
import { useRecoilState } from 'recoil'

import { env } from '../../config'
import { lang } from '../../store'
import { Languages } from '../../laguage'
import BubleComponents from "../../components/buble.components";
import WaveComponents from "../../components/wave.components";

const ForgotPassScreen = ({ navigation }) => {
    const [languange, setLang] = useRecoilState(lang)

    return (
        <View style={style.container}>
            <BubleComponents/>
            <View style={style.container_text}>
                <Text style={{ color:'#ffffff', fontWeight:'bold', fontSize:27 }}>
                    {Languages[languange].Sign_In}
                </Text>
            </View>
            <View style={{backgroundColor: '#ffffff',borderRadius: 30, height:'100%'}}>
                <View style={style.container_form}>
                    <View>
                        <View style={{marginVertical:10}}>
                            <Text style={{ fontSize:14, color:'#8E8E8E' }}>{Languages[languange].Username_or_email}</Text>
                        </View>
                        <View>
                            <TextInput placeholder={Languages[languange].Enter_email_your_account} placeholderTextColor="#9D9D9D" style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }}/>
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity style={{ backgroundColor:'#54AEEA', padding:12, borderRadius:10, justifyContent:'center', alignItems:'center' }} onPress={() => setLang("id")}>
                            <Text style={{ fontWeight:'bold', fontSize:12, color:'#ffffff' }}>
                                {Languages[languange].Send_verification}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:30, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{ fontSize:14, color:'#8E8E8E' }}>
                            {Languages[languange].About_developer}
                        </Text>
                        <TouchableOpacity onPress={() => Linking.openURL(env.dev_url)}>
                            <Text style={{ fontWeight:'bold', fontSize:14, color:'#54AEEA' }}>
                                &nbsp;{Languages[languange].Click_here}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <WaveComponents/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        backgroundColor: '#54AEEA',
        height: '100%',
        width: '100%'
    },
    container_text : {
        marginTop : 90,
        marginBottom: 20,
        justifyContent:'center',
        alignItems: 'center',
    },
    container_form : {
        padding:50,
        flex:1
    }
})


export default ForgotPassScreen