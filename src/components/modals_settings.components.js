import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { modalSettings, showChangePassword, lang } from '../store'
import { Languages } from '../laguage'

const ModalsSettings = (props) => {
    const [showSettings, setShowSettings] = useRecoilState(modalSettings)
    const [changePass, setChangePass]     = useRecoilState(showChangePassword)
    const [languange, setLang]            = useRecoilState(lang)

    const logout = async () => {
        await AsyncStorage.removeItem("token_key")
        props.navigation.navigate("LoginScreen")
        setShowSettings(false)
    }

    const showChangePass = () => {
        setShowSettings(false)
        setChangePass(true)
    }

    return (
        <Modal isVisible={showSettings} animationInTiming={500} animationOutTiming={600}  backdropOpacity={0.4}>
            <View style={{backgroundColor:"#ffffff", padding:10, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:300}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize:17}}>
                                {Languages[languange].settings}
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <TouchableOpacity onPress={() => showChangePass()} style={{marginVertical:5, flexDirection:'row', paddingVertical:5}}>
                            <Icon name="form-textbox-password" size={20} style={{marginRight:10}}/>
                            <Text style={{color:"#8E8E8E"}}>
                                {Languages[languange].change_password}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => logout()} style={{marginVertical:5, flexDirection:'row', paddingVertical:5}}>
                            <Icon name="logout" size={20} style={{marginRight:10}}/>
                            <Text style={{color:"#8E8E8E"}}>
                                {Languages[languange].logout}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowSettings(false)} style={{marginVertical:5, flexDirection:'row', paddingVertical:5}}>
                            <Icon name="close" size={20} style={{marginRight:10}}/>
                            <Text style={{color:"#8E8E8E"}}>
                                {Languages[languange].close}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalsSettings