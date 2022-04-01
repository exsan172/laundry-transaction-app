import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Curency from 'rupiah-format'
import { useRecoilState } from 'recoil'
import moment from "moment-timezone";
import jwtDecode from "jwt-decode";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NetInfo from '@react-native-community/netinfo'

import BubleComponents from "../../components/buble.components";
import { GET } from '../../config'
import { Languages } from '../../laguage'
import { totalTransaction, income, selectDate, lang, alertWarning, alertError, alertSuccess, listStoreHome, storeInputModalsTransaction, weightInputModalsTransaction, customerInputModalsTransaction, modalCreateTransaction } from '../../store'
import SelectDate from "../../components/alert_select_date.components";
import AlertWarning from "../../components/alert_warning.componennts";
import AlertError from "../../components/alert_error.components";
import AlertSuccess from "../../components/alert_success.components";

const HomeScreen = () => {
    const [totalIncome, setIncome]      = useRecoilState(income)
    const [totalTrans, setTotalTrans]   = useRecoilState(totalTransaction)
    const [date, setDate]               = useRecoilState(selectDate)
    const [warning, setWarning]         = useRecoilState(alertWarning)
    const [error, setError]             = useRecoilState(alertError)
    const [success, setSuccess]         = useRecoilState(alertSuccess)
    const [listStore, setListStore]     = useRecoilState(listStoreHome)
    const [refresh, setRefresh]         = useState(false)
    const [transaction, setTransaction] = useState([])
    const [loading, setLoading]         = useState(false)
    const [languange, setLang]          = useRecoilState(lang)
    const [activeFilter, setActiveFilter]= useState("today")
    const [store, setStore]             = useRecoilState(storeInputModalsTransaction)
    const [weight, setWeight]           = useRecoilState(weightInputModalsTransaction)
    const [customer, setCustomer]       = useRecoilState(customerInputModalsTransaction)
    const [modalTrans, setModasTransaction] = useRecoilState(modalCreateTransaction)

    useEffect(() => {
        getDataToday()
        getStore()
    }, [])

    const getStore = async () => {
        const token = await AsyncStorage.getItem('token_key')
        const store = await GET(token, "transaction/get-cabang", null)
        const lang = await AsyncStorage.getItem('language')

        let storeList = [{
            label: Languages[lang].Enter_store,
            value: ""
        }]

        for(const i in store.data.data) {
            storeList.push({
                label : store.data.data[i].cabang,
                value : store.data.data[i]._id
            })
        }

        setListStore(storeList)
    }

    const getDataToday = () => {
        const today   = moment().tz("Asia/Jakarta").format("YYYY-MM-D")
        const nextDay = moment().tz("Asia/Jakarta").add(1, "days").format("YYYY-MM-D")
        getTransaction(today, nextDay, "today")
    }

    const getDataYesterday = () => {
        const today   = moment().tz("Asia/Jakarta").subtract(2, 'days').format("YYYY-MM-D")
        const prevDay  = moment().tz("Asia/Jakarta").subtract(1, 'days').format("YYYY-MM-D")
        getTransaction(today, prevDay, "yesterday")
    }

    const getTransaction = async (today, nextDay, active) => {
        setActiveFilter(active)
        const token       = await AsyncStorage.getItem('token_key')
        const tokenDecode = jwtDecode(token)
        const link        = tokenDecode.role === "owner" ? "transaction/get-transaksi-owner" : "transaction/get-transaksi"
        const reqId       = tokenDecode.role === "owner" ? tokenDecode.id_user : tokenDecode.cabang
        
        setLoading(true)
        NetInfo.fetch().then( state => {
            if(state.isConnected === true) {
                GET(token, `${link}/${reqId}/${today}/${nextDay}`, null).then(res => {
                    
                    if(res.data.statusCode === 200) {
                        AsyncStorage.setItem('transaction_list', JSON.stringify(res.data)).then(() => {
                            let totalIn = 0
                            for(const i in res.data.data) {
                                totalIn += res.data.data[i].total_price
                            }
                            
                            setTransaction(res.data.data)
                            setTotalTrans(res.data.data.length)
                            setIncome(totalIn)
                        })
                    }

                })
            } else {
                AsyncStorage.getItem('transaction_list').then(res => {
                    setWarning(Languages[languange].offline)
                    const dataStorage = JSON.parse(res)
                    if(dataStorage.data.statusCode === 200) {

                        let totalIn = 0
                        for(const i in dataStorage.data.data) {
                            totalIn += dataStorage.data.data[i].total_price
                        }
                        
                        setTransaction(dataStorage.data.data)
                        setTotalTrans(dataStorage.data.data.length)
                        setIncome(totalIn)
                    }
                })
            }
        })
        setLoading(false)
    }

    const refreshData = () => {
        if(activeFilter === "today") {
            getDataToday()
        } else if(activeFilter === "yesterday") {
            getDataYesterday()
        }
    }

    const setModalEditData = (data) => {
        setModasTransaction(true)
        setStore(data.id_cabang)
        setWeight(data.total_weight)
        setCustomer(data.name)
    }
    
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshData}/>}>
            <SelectDate/>
            <AlertWarning/>
            <AlertError/>
            <AlertSuccess/>
            <View>
                <View style={{ backgroundColor:"#54AEEA", borderBottomRightRadius:20, borderBottomLeftRadius:20, height:210}}>
                    <BubleComponents/>
                    <View style={{flex:1, justifyContent:'flex-end', margin:10}}>
                        <View style={{ padding:5 }}>
                            <Text style={{ color:'#ffffff', fontWeight:'300', fontSize:18, textTransform:'uppercase' }}>
                                {Languages[languange].Transaction_report}
                            </Text>
                        </View>
                        <View style={{backgroundColor:"#ffffff", padding:15, borderRadius:15, height:100, flexDirection:'row'}}>
                            <View style={{minWidth:100}}>
                                <View>
                                    <Text style={{color:"#8E8E8E"}}>{Languages[languange].transaction}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', flex:1 }}>
                                    <Text style={{ fontWeight:'bold', color: '#54AEEA', fontSize:20 }}>{totalTrans}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginHorizontal:10}}>
                                <View>
                                    <Text style={{color:"#8E8E8E"}}>{Languages[languange].income}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', flex:1 }}>
                                    <Text style={{ fontWeight:'bold', color: '#54AEEA', fontSize:20 }}>+{Curency.convert(totalIncome)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor: activeFilter === "yesterday" ? '#54AEEA' : "#ffffff", borderRadius:8, width:120, height:35, justifyContent:'center', alignItems:'center', borderWidth: activeFilter === "yesterday" ? 0 : 1, borderColor:"#54AEEA"}} onPress={() => getDataYesterday()}>
                            <Icon name="page-previous" size={17} color={activeFilter === "yesterday" ? "#ffffff" : "#54AEEA"}/>
                            <Text style={{ color: activeFilter === "yesterday" ? "#ffffff" : "#54AEEA", marginHorizontal:6 }}>{Languages[languange].yesterday}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor: activeFilter === "today" ? '#54AEEA' : "#ffffff", borderRadius:8, width:120, height:35, justifyContent:'center', alignItems:'center', borderWidth: activeFilter === "today" ? 0 : 1 , borderColor:"#54AEEA"}} onPress={() => getDataToday()}>
                            <Icon name="calendar-today" size={17} color={activeFilter === "today" ? "#ffffff" : "#54AEEA"}/>
                            <Text style={{ color:activeFilter === "today" ? "#ffffff" : "#54AEEA", marginHorizontal:6 }}>{Languages[languange].today}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor:'#ffffff', borderRadius:8, height:35, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:"#54AEEA"}} onPress={() => setDate(true)}>
                            <Icon name="filter" size={17} color="#54AEEA"/>
                            <Text style={{ color:"#54AEEA", marginHorizontal:6 }}>{Languages[languange].filter_date}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:20, backgroundColor:'#ffffff', borderRadius:8, height:35, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:"#54AEEA"}} onPress={() => setDate(true)}>
                            <Icon name="download" size={17} color="#54AEEA"/>
                            <Text style={{ color:"#54AEEA", marginHorizontal:6 }}>{Languages[languange].download_report}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View>
                    {   
                        loading === false ?
                            transaction.length > 0 ?
                                transaction.map(data => {
                                    return (
                                        <View key={data._id} style={{borderWidth:1, borderColor:"#EEEEEE", padding:13, marginVertical:2, marginHorizontal:10, borderRadius:5, backgroundColor:"#ffffff", flexDirection:'row'}}>
                                            <View style={{marginRight:10}}>
                                                <View style={{backgroundColor:"#54AEEA", borderRadius:10, padding:10, width:60, justifyContent:'center', alignItems:'center', flex:1}}>
                                                    <View>
                                                        <Text style={{color:"#ffffff", fontWeight:'bold'}}>
                                                            {data.total_weight}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{color:"#ffffff", fontWeight:'bold'}}>
                                                            KG
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flexDirection:'row', flex:1}}>
                                                <View style={{flex:1}}>
                                                    <View style={{flex:1}}>
                                                        <Text style={{fontWeight:'bold', fontSize:14, textTransform:'capitalize'}}>{data.cabang}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{fontSize:14, textTransform:'capitalize'}}>
                                                            {data.name}
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{fontSize:10}}>
                                                            {moment(data.createdAt).format("MMM D, HH.mm")}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{flex:1, alignItems:'flex-end'}}>
                                                    <View style={{flex:1}}>
                                                        <Text style={{fontWeight:'bold'}}>
                                                            {Curency.convert(data.total_price)}
                                                        </Text>
                                                    </View>
                                                    <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                                                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:5}}>
                                                            <Icon name="trash-can" size={17} color="#ffffff"/>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{marginLeft:3, paddingVertical:5, paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:5}} onPress={() => setModalEditData(data)}>
                                                            <Icon name="lead-pencil" size={17} color="#ffffff"/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            :
                                <View style={{justifyContent:'center', alignItems:'center', padding:15, backgroundColor:"#ffffff", margin:10, borderRadius:5}}>
                                    <Image source={require("../../assets/icons/ask_icon.png")} style={{ width:50, height:50, marginBottom:10 }}/>
                                    <Text style={{fontSize:14, fontWeight:'bold', color:"#54AEEA"}}>
                                        {Languages[languange].hey_today_not_any_transaction}
                                    </Text>
                                </View>
                        :
                            <View style={{justifyContent:'center', alignItems:'center', padding:50}}>
                                <ActivityIndicator size="small" color="#54AEEA"/>
                            </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen