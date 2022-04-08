import React, { useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";
import { Picker } from 'react-native-woodpicker'

import { POST } from '../config'
import { modalCreateTransaction } from '../store'
import { Languages } from '../laguage'
import { lang, alertWarning, alertError, alertSuccess, listStoreHome, weightInputModalsTransaction, storeInputModalsTransaction, customerInputModalsTransaction, idEditTransaction } from '../store'

const ModalsCreateTransaction = () => {
    const [showTransaction, setShowTransacation] = useRecoilState(modalCreateTransaction)
    const [languange, setLang]                   = useRecoilState(lang)
    const [warning, setWarning]                  = useRecoilState(alertWarning)
    const [error, setError]                      = useRecoilState(alertError)
    const [success, setSuccess]                  = useRecoilState(alertSuccess)
    const [listStore, setListStore]              = useRecoilState(listStoreHome)
    const [store, setStore]                      = useRecoilState(storeInputModalsTransaction)
    const [customer, setCustomer]                = useRecoilState(customerInputModalsTransaction)
    const [weight, setWeight]                    = useRecoilState(weightInputModalsTransaction)
    const [idEdit, setIdEdit]                    = useRecoilState(idEditTransaction)
    const [loadingTrans, setLoadingTrans]        = useState(false)

    const closeTransacton = () => {
        setShowTransacation(false)
        setStore("")
        setCustomer("")
        setWeight("")
    }

    const saveTransaction = async () => {
        setLoadingTrans(true)
        if(customer !== "" && weight !== "") {

            try {
                const token = await AsyncStorage.getItem('token_key')
                const tokenDecode = jwtDecode(token)
                const url = idEdit !== "" ? "transaction/edit-transaksi" : "transaction/input-transaksi"
                
                tokenDecode.role !== "owner" && idEdit === "" && setStore({value : tokenDecode.cabang})
                const newTransaction = await POST(token, url, {
                    "id_transaksi" : idEdit,
                    "id_cabang" : store.value,
                    "total_weight" : weight,
                    "name" : customer
                })
                
                if(newTransaction.data.statusCode === 201) {
                    setSuccess(Languages[languange].saved_data)
                    setShowTransacation(false)
                    setStore("")
                    setCustomer("")
                    setWeight("")
                } else {
                    setWarning(newTransaction.data.message)
                }
                
            } catch (error) {
                setError(error.message)
            }

        } else {
            setWarning(Languages[languange].Please_fill_all_required_field)
        }
        setLoadingTrans(false)
    }

    return (
        <Modal isVisible={showTransaction} style={{margin:0}} animationInTiming={500} animationOutTiming={600} backdropOpacity={0.4} onBackdropPress={() => setShowTransacation(false)}>
            <View style={{backgroundColor:"#ffffff", position:'absolute', top:0, width:"100%", padding:10, alignItems:'center' }}>
                <View style={{minWidth:250, paddingTop:20}}>
                    <View>
                        <View>
                            <View>
                                <Text style={{fontSize:14, color:'#8E8E8E'}}>{Languages[languange].store}</Text>
                            </View>
                            <View style={{marginVertical:15}}>
                                <Picker
                                    placeholder={Languages[languange].Enter_store}
                                    isNullable={false}
                                    title={Languages[languange].store}
                                    onItemChange={setStore}
                                    items={listStore}
                                    item={store}
                                    textInputStyle={{
                                        fontSize:12,
                                        color:"#9D9D9D"
                                    }}
                                    style={{
                                        height:45,
                                        backgroundColor: '#F8F8F8',
                                        paddingHorizontal:15, 
                                        paddingVertical:8,
                                        borderRadius:10
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={{fontSize:14, color:'#8E8E8E'}}>{Languages[languange].customer}</Text>
                            </View>
                            <View style={{marginVertical:15}}>
                                <TextInput 
                                    placeholder={Languages[languange].Enter_customer}
                                    placeholderTextColor="#9D9D9D" 
                                    style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                    onChangeText={(e) => setCustomer(e)}
                                    value={customer}
                                />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={{fontSize:14, color:'#8E8E8E'}}>{Languages[languange].total_weight}</Text>
                            </View>
                            <View style={{marginVertical:15}}>
                                <TextInput 
                                    placeholder={Languages[languange].enter_weight}
                                    placeholderTextColor="#9D9D9D" 
                                    style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                    onChangeText={(e) => setWeight(e)}
                                    value={weight.toString()}
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>
                        <View style={{marginTop:10}}>
                            <TouchableOpacity style={{backgroundColor:"#54AEEA", justifyContent:'center', flexDirection:'row', padding:8, borderRadius:10, justifyContent:'center', alignItems:'center'}} onPress={() => saveTransaction()}>
                                {
                                    loadingTrans === true &&
                                    <View style={{marginHorizontal:5}}>
                                        <ActivityIndicator size={15} color="#ffffff"/>
                                    </View>
                                }
                                <View>
                                    <Text style={{color:"#ffffff"}}>{Languages[languange].save_transaction}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:15, marginBottom:5}}>
                        <TouchableOpacity onPress={() => closeTransacton()} style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Text style={{color:"#8E8E8E", marginHorizontal:5, fontSize:12, marginVertical:5}}>{Languages[languange].close}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalsCreateTransaction