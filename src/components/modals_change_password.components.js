import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { POST } from '../config'
import { showChangePassword, alertWarning, alertError, alertSuccess, lang } from '../store'
import { Languages } from '../laguage'

const ChangePassword = () => {
    const [show, setShow]                       = useRecoilState(showChangePassword)
    const [warning, setWarning]                 = useRecoilState(alertWarning)
    const [error, setError]                     = useRecoilState(alertError)
    const [success, setSuccess]                 = useRecoilState(alertSuccess)
    const [languange, setLang]                  = useRecoilState(lang)
    const [confirmPassword, setconfirmPassword] = useState(null)
    const [newPassword, setNewPassword]         = useState(null)
    const [loading, setLoading]                 = useState(false)

    const savePassword = async () => {
        setLoading(true)
        if(confirmPassword !== null && newPassword !== null) {
            try {
                const token  = await AsyncStorage.getItem('token_key')
                const change = await POST(token, "auth/change-password", {
                    "newPassword" : newPassword,
                    "confirmNewPassword" : confirmPassword
                })

                if(change.data.statusCode === 400) {
                    setWarning(Languages[languange].not_match_password)
                } else {
                    setShow(false)
                    setconfirmPassword(null)
                    setNewPassword(null)
                    setSuccess(Languages[languange].success_change_pass)
                }
            } catch (error) {
                setError(error.message)
            }
        } else {
            setWarning(Languages[languange].Please_fill_all_required_field)
        }
        setLoading(false)
    }

    const closeModals = () => {
        setNewPassword(null)
        setconfirmPassword(null)
        setShow(false)
    }

    return (
        <Modal isVisible={show} animationInTiming={500} animationOutTiming={600}  backdropOpacity={0.4} avoidKeyboard={true}>
            <View style={{backgroundColor:"#ffffff", padding:25}}>
                <View style={{marginBottom:10}}>
                    <Text style={{fontWeight:'bold', color:"#8E8E8E"}}>
                        {Languages[languange].change_password}
                    </Text>
                </View>
                <View style={{marginVertical:20}}>
                    <View style={{marginVertical:5}}>
                        <Text style={{marginBottom:10, color:"#8E8E8E", fontSize:12}}>
                            {Languages[languange].new_password}
                        </Text>
                        <TextInput 
                            placeholder={Languages[languange].enter_new_password}
                            placeholderTextColor="#8E8E8E"
                            secureTextEntry
                            onChangeText={(val) => setNewPassword(val)}
                            value={newPassword}
                            style={{ borderWidth:1, borderColor:"#8E8E8E", borderRadius:5, paddingVertical:5, paddingHorizontal:10, color:"#8E8E8E", fontSize:10 }}
                        />
                    </View>
                    <View style={{marginVertical:5}}>
                        <Text style={{marginBottom:10, color:"#8E8E8E", fontSize:12}}>
                            {Languages[languange].confirm_password}
                        </Text>
                        <TextInput 
                            placeholder={Languages[languange].enter_confirm_password}
                            placeholderTextColor="#8E8E8E"
                            secureTextEntry
                            onChangeText={(val) => setconfirmPassword(val)}
                            value={confirmPassword}
                            style={{ borderWidth:1, borderColor:"#8E8E8E", borderRadius:5, paddingVertical:5, paddingHorizontal:10, color:"#8E8E8E", fontSize:10 }}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => savePassword()} style={{backgroundColor:"#54AEEA", padding:10, width:"100%", justifyContent:'center', alignItems:'center', marginBottom:10, borderRadius:5}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            {
                                loading === true && 
                                <View style={{marginHorizontal:10}}>
                                    <ActivityIndicator size={15} color="#ffffff"/>
                                </View>
                            }
                            <View>
                                <Text style={{color:"#ffffff"}}>
                                    {Languages[languange].save}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => closeModals()}>
                        <Text style={{color:"#8E8E8E"}}>
                            {Languages[languange].close}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ChangePassword