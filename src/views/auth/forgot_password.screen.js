import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRecoilState } from 'recoil'
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { POST } from '../../config'
import { env } from '../../config'
import { lang, alertWarning, alertError, loadingStore, alertSuccess } from '../../store'
import { Languages } from '../../laguage'
import BubleComponents from "../../components/buble.components";
import WaveComponents from "../../components/wave.components";
import AlertWarning from "../../components/alert_warning.componennts";
import AlertError from "../../components/alert_error.components";
import AlertSuccess from "../../components/alert_success.components";

const ForgotPassScreen = ({ navigation }) => {
    const [languange, setLang]    = useRecoilState(lang)
    const [loading, setLoading]   = useRecoilState(loadingStore)
    const [warning, setWarning]   = useRecoilState(alertWarning)
    const [error, setError]       = useRecoilState(alertError)
    const [success, setSuccess]   = useRecoilState(alertSuccess)
    const [username, setUsername] = useState("")

    useEffect(() => {
        const langs = async () => {
            const getLanguage = await RNLocalize.getLocales()
            const checkLang   = getLanguage[0].languageCode === "id" ? "id" : "en"
            await AsyncStorage.setItem('language', checkLang)
            
            const lang = await AsyncStorage.getItem('language')
            setLang(lang)
        }

        langs()
    }, [])

    const sendConfirm = async () => {
        setLoading(true)
        if (username !== "") {
            try {
                const forgotPass = await POST(null, "auth/forgot-password", {
                    username : username,
                })

                if(forgotPass.data.statusCode !== 400) {
                    setLoading(false)
                    setSuccess(Languages[languange].Email_sended)
                    setUsername("")
                } else {
                    setLoading(false)
                    setError(forgotPass.data.message+" ,"+Languages[languange].username_must_email)
                }
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        } else {
            setLoading(false)
            setWarning(Languages[languange].Please_fill_all_required_field)
        }
    }

    return (
        <View style={style.container}>
            <BubleComponents/>
            <AlertWarning/>
            <AlertError/>
            <AlertSuccess/>
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
                            <TextInput 
                                placeholder={Languages[languange].Enter_email_your_account} 
                                placeholderTextColor="#9D9D9D"
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                onChangeText={(e) => setUsername(e)}
                                value={username}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity style={{ backgroundColor:'#54AEEA', padding:12, borderRadius:10, justifyContent:'center', alignItems:'center' }} onPress={() => sendConfirm()}>
                            <View style={{flexDirection:'row'}}>
                                {
                                    loading === true &&
                                    <View style={{marginHorizontal:10}}>
                                        <ActivityIndicator size="small" color="#ffffff"/>
                                    </View>
                                }
                                <View>
                                    <Text style={{ fontWeight:'bold', fontSize:12, color:'#ffffff' }}>
                                        {Languages[languange].Send_verification}
                                    </Text>
                                </View>
                            </View>
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