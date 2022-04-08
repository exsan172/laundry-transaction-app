import React, { useState } from "react"
import Modal from "react-native-modal";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GET } from '../config'
import { showDeleteConfirmHome, idDeleteTransaction, alertSuccess, lang } from '../store'
import { Languages } from '../laguage'

const ConfirmDeleteHome = (props) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useRecoilState(showDeleteConfirmHome)
    const [idDelete, setIdDelete]                   = useRecoilState(idDeleteTransaction)
    const [success, setSuccess]                     = useRecoilState(alertSuccess)
    const [languange, setLang]                      = useRecoilState(lang)
    const [loading, setLoading]                     = useState(false)

    const deleteTrans = async (id) => {
        setLoading(true)
        const token = await AsyncStorage.getItem('token_key')
        const del   = await GET(token,`transaction/delete-transaksi/${id}`, null)
        
        if(del.data.statusCode === 200) {
            setShowDeleteConfirm(false)
            setSuccess(Languages[languange].success_deleted)
        }

        setLoading(false)
    }

    return (
        <Modal isVisible={showDeleteConfirm} animationInTiming={500} animationOutTiming={600} backdropOpacity={0.4}>
            <View style={{backgroundColor:"#ffffff", padding:20}}>
                <View style={{padding:10, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require("../assets/icons/warning_icon.png")} style={{ width:50, height:50, marginBottom:10 }}/>
                    <Text style={{color:"#8E8E8E"}}>
                        {Languages[languange].confirm_delete_trans}
                    </Text>
                </View>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <TouchableOpacity style={{backgroundColor:"#54AEEA", padding:7, flexDirection:'row', borderRadius:5, justifyContent:'center', alignItems:'center', flex:1}} onPress={() => deleteTrans(idDelete)}>
                        {
                            loading === true &&
                            <View style={{marginHorizontal:5}}>
                                <ActivityIndicator size={20} color="#ffffff"/>
                            </View>
                        }
                        <View>
                            <Text style={{color:'#ffffff'}}>
                                Yes
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex:1}} onPress={() => setShowDeleteConfirm(false)}>
                        <Text style={{color:"#54AEEA"}}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmDeleteHome