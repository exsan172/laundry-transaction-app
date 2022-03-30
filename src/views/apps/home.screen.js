import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Curency from 'rupiah-format'
import { useRecoilState } from 'recoil'
import moment from "moment-timezone";
import jwtDecode from "jwt-decode";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import BubleComponents from "../../components/buble.components";
import { GET } from '../../config'
import { Languages } from '../../laguage'
import { totalTransaction, income, selectDate, lang, alertWarning, alertError, alertSuccess } from '../../store'
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
    const [refresh, setRefresh]         = useState(false)
    const [transaction, setTransaction] = useState([])
    const [loading, setLoading]         = useState(false)
    const [languange, setLang]          = useRecoilState(lang)

    useEffect(() => {
        getDataToday()
    }, [])

    const getDataToday = () => {
        const today   = moment().tz("Asia/Jakarta").format("YYYY-MM-D")
        const dayPlus = parseInt(moment().tz("Asia/Jakarta").format("D"))+1
        const nextDay = moment().tz("Asia/Jakarta").format("YYYY-")+moment().tz("Asia/Jakarta").format("MM-")+dayPlus
        getTransaction(today, nextDay)
    }

    const getDataYesterday = () => {
        const today   = moment().tz("Asia/Jakarta").format("YYYY-MM-D")
        const dayMin = parseInt(moment().tz("Asia/Jakarta").format("D"))-1
        const prevDay = moment().tz("Asia/Jakarta").format("YYYY-")+moment().tz("Asia/Jakarta").format("MM-")+dayMin
        getTransaction(today, prevDay)
    }

    const getTransaction = async (today, nextDay) => {
        setLoading(true)
        const token       = await AsyncStorage.getItem('token_key')
        const tokenDecode = jwtDecode(token)
        const link        = tokenDecode.role === "owner" ? "transaction/get-transaksi-owner" : "transaction/get-transaksi"
        const reqId       = tokenDecode.role === "owner" ? tokenDecode.id_user : tokenDecode.cabang
        const getTrans    = await GET(token, `${link}/${reqId}/${today}/${nextDay}`, null)
        
        if(getTrans.data.statusCode === 200) {
            let totalIn = 0
            for(const i in getTrans.data.data) {
                totalIn += getTrans.data.data[i].total_price
            }
            
            setTransaction(getTrans.data.data)
            setTotalTrans(getTrans.data.data.length)
            setIncome(totalIn)
        }
        setLoading(false)
    }
    
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={getDataToday}/>}>
            <SelectDate/>
            <AlertWarning/>
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
                                    <Text style={{color:"#8E8E8E"}}>Transaction</Text>
                                </View>
                                <View style={{ justifyContent: 'center', flex:1 }}>
                                    <Text style={{ fontWeight:'bold', color: '#54AEEA', fontSize:20 }}>{totalTrans}</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginHorizontal:10}}>
                                <View>
                                    <Text style={{color:"#8E8E8E"}}>Income</Text>
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
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:8, width:120, height:35, justifyContent:'center', alignItems:'center'}} onPress={() => getDataYesterday()}>
                            <Icon name="page-previous" size={17} color="#ffffff"/>
                            <Text style={{ color:"#ffffff", marginHorizontal:6 }}>Yesterday</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:8, width:120, height:35, justifyContent:'center', alignItems:'center'}} onPress={() => getDataToday()}>
                            <Icon name="calendar-today" size={17} color="#ffffff"/>
                            <Text style={{ color:"#ffffff", marginHorizontal:6 }}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:8, width:120, height:35, justifyContent:'center', alignItems:'center'}} onPress={() => setDate(true)}>
                            <Icon name="filter" size={17} color="#ffffff"/>
                            <Text style={{ color:"#ffffff", marginHorizontal:6 }}>Filter Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal:3, paddingVertical:5, flexDirection:'row', paddingHorizontal:20, backgroundColor:'#54AEEA', borderRadius:8, height:35, justifyContent:'center', alignItems:'center'}} onPress={() => setDate(true)}>
                            <Icon name="download" size={17} color="#ffffff"/>
                            <Text style={{ color:"#ffffff", marginHorizontal:6 }}>Download Report</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View>
                    {   
                        loading === false ?
                            transaction.length > 0 ?
                                transaction.map(data => {
                                    return (
                                        <View key={data._id} style={{borderWidth:1, borderColor:"#EEEEEE", padding:13, marginVertical:5, marginHorizontal:10, borderRadius:5, backgroundColor:"#ffffff", flexDirection:'row'}}>
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
                                                        <TouchableOpacity style={{marginLeft:3, paddingVertical:5, paddingHorizontal:15, backgroundColor:'#54AEEA', borderRadius:5}}>
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
                                        Hey, today not any transaction, create your frist transaction.
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