import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRecoilState } from 'recoil'

import { POST } from '../../config'
import { lang, alertWarning, alertError, loadingStore } from '../../store'
import { Languages } from '../../laguage'
import BubleComponents from "../../components/buble.components";
import WaveComponents from "../../components/wave.components";
import AlertWarning from "../../components/alert_warning.componennts";
import AlertError from "../../components/alert_error.components";

const LoginScreen = ({ navigation }) => {
    const [languange, setLang]    = useRecoilState(lang)
    const [warning, setWarning]   = useRecoilState(alertWarning)
    const [error, setError]       = useRecoilState(alertError)
    const [loading, setLoading]   = useRecoilState(loadingStore)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitLogin = async () => {
        
        setLoading(true)
        if(username !== "" && password !== "") {
            
            try {
                const login = await POST(null, "auth/login", {
                    username : username,
                    password : password
                })

                if(login.data.statusCode !== 400) {

                } else {
                    setLoading(false)
                    setError(login.data.message+ " ,username must email, and password min length is 8.")    
                }
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }

        } else {
            setLoading(false)
            setWarning("Please fill username and password.")
        }
    }

    return (
        <View style={style.container}>
            <BubleComponents/>
            <AlertWarning/>
            <AlertError/>
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
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }}
                                value={username}
                                onChangeText={(e) => setUsername(e)}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{ fontSize:14, color: '#8E8E8E' }}>{Languages[languange].Password}</Text>
                        </View>
                        <View>
                            <TextInput 
                                placeholder={Languages[languange].Enter_password_length_is_8_character} 
                                placeholderTextColor="#9D9D9D" 
                                style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12 }}
                                value={password}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassScreen")}>
                            <Text style={{ fontWeight:'bold', fontSize:14, color:'#54AEEA' }}>
                                {Languages[languange].Forgot_password_}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableOpacity 
                            style={{ backgroundColor:'#54AEEA', padding:12, borderRadius:10, justifyContent:'center', alignItems:'center' }} 
                            onPress={() => submitLogin()}>
                            <View style={{flexDirection:'row'}}>
                                {
                                    loading === true &&
                                    <View style={{marginHorizontal:10}}>
                                        <ActivityIndicator size="small" color="#ffffff"/>
                                    </View>
                                }
                                <View>
                                    <Text style={{ fontWeight:'bold', fontSize:12, color:'#ffffff' }}>
                                        {Languages[languange].Sign_In}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:30, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{ fontSize:14, color:'#8E8E8E' }}>
                            {Languages[languange].Dont_have_an_account}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                            <Text style={{ fontWeight:'bold', fontSize:14, color:'#54AEEA' }}>
                                &nbsp;{Languages[languange].Sign_up}
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


export default LoginScreen