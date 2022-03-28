import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRecoilState } from 'recoil'
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { POST } from '../../config'
import { Languages } from '../../laguage'
import { lang, alertWarning, alertError, loadingStore, alertSuccess } from '../../store'
import BubleComponents from "../../components/buble.components";
import WaveComponents from "../../components/wave.components";
import AlertWarning from "../../components/alert_warning.componennts";
import AlertError from "../../components/alert_error.components";
import AlertSuccess from "../../components/alert_success.components";

const RegisterScreen = ({ navigation }) => {
    const [languange, setLang]    = useRecoilState(lang)
    const [loading, setLoading]   = useRecoilState(loadingStore)
    const [warning, setWarning]   = useRecoilState(alertWarning)
    const [error, setError]       = useRecoilState(alertError)
    const [success, setSuccess]   = useRecoilState(alertSuccess)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName]         = useState("")

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

    const registerUser = async () => {
        setLoading(true)

        if(username !== "" && password !== "" && name !== ""){
            try {
                const regis = await POST(null, "auth/public-register", {
                    username : username,
                    password : password,
                    name : name
                })

                if(regis.data.statusCode !== 400) {
                    setLoading(false)
                    setSuccess(Languages[languange].Success_register_user)
                    setUsername("")
                    setPassword("")
                    setName("")
                } else {
                    setLoading(false)
                    setError(regis.data.message+" ,"+Languages[languange].username_must_email_and_password_min_length_is_8)    
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
                    {Languages[languange].Sign_up}
                </Text>
            </View>
            <View style={{backgroundColor: '#ffffff',borderRadius: 30, height:'100%'}}>
                <View style={style.container_form}>
                    <View>
                        <View style={{marginVertical:10}}>
                            <Text style={{ fontSize:14, color:'#8E8E8E' }}>{Languages[languange].Full_name}</Text>
                        </View>
                        <View>
                            <TextInput 
                                placeholder={Languages[languange].Enter_your_full_name} 
                                placeholderTextColor="#9D9D9D" 
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }}
                                onChangeText={(e) => setName(e)}
                                value={name}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{ fontSize:14, color:'#8E8E8E' }}>{Languages[languange].Username_or_email}</Text>
                        </View>
                        <View>
                            <TextInput 
                                placeholder={Languages[languange].Enter_email_your_account} 
                                placeholderTextColor="#9D9D9D" 
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }}
                                onChangeText={(e) => setUsername(e)}
                                value={username}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{ fontSize:14, color: '#8E8E8E' }}>{Languages[languange].Password}</Text>
                        </View>
                        <View>
                            <TextInput 
                                placeholder={Languages[languange].Enter_password_length_is_8_character} 
                                placeholderTextColor="#9D9D9D" 
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }} 
                                secureTextEntry
                                onChangeText={(e) => setPassword(e)}
                                value={password}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity style={{ backgroundColor:'#54AEEA', padding:12, borderRadius:10, justifyContent:'center', alignItems:'center' }} onPress={() => registerUser()}>
                            <View style={{flexDirection:'row'}}>
                                {
                                    loading === true &&
                                    <View style={{marginHorizontal:10}}>
                                        <ActivityIndicator size="small" color="#ffffff"/>
                                    </View>
                                }
                                <View>
                                    <Text style={{ fontWeight:'bold', fontSize:12, color:'#ffffff' }}>
                                        {Languages[languange].Sign_up}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:30, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{ fontSize:14, color:'#8E8E8E' }}>
                            {Languages[languange].Already_have_account}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style={{ fontWeight:'bold', fontSize:14, color:'#54AEEA' }}>
                                &nbsp;{Languages[languange].Sign_In}
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
        alignItems: 'center'
    },
    container_form : {
        padding:50,
        flex:1
    }
})


export default RegisterScreen