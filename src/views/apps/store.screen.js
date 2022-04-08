import React, { useState } from "react";
import { View, Text, ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil'

import BubleComponents from "../../components/buble.components";
import { Languages } from '../../laguage'
import { lang } from '../../store'

const StoreScreen = () => {
    const [refresh, setRefresh] = useState(false)
    const [languange, setLang]  = useRecoilState(lang)

    const refreshStore = () => {

    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshStore}/>}>
            <View style={{backgroundColor:"#54AEEA", borderBottomRightRadius:20, borderBottomLeftRadius:20, height:210}}>
                <BubleComponents/>
                <View style={{flex:1, justifyContent:'flex-end', margin:10}}>
                    <View style={{ padding:5 }}>
                        <Text style={{ color:'#ffffff', fontWeight:'300', fontSize:18, textTransform:'uppercase' }}>
                            {Languages[languange].store_report}
                        </Text>
                    </View>
                    <View style={{backgroundColor:"#ffffff", padding:15, borderRadius:15, height:100, flexDirection:'row', justifyContent:'center'}}>
                        <View>
                            <View>
                                <Text style={{color:"#8E8E8E"}}>{Languages[languange].total_all_store}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flex:1, alignItems:'center' }}>
                                <Text style={{ fontWeight:'bold', color: '#54AEEA', fontSize:20 }}>11</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginTop:5}}>
                <View style={{borderWidth:1, borderColor:"#EEEEEE", padding:13, marginVertical:2, marginHorizontal:10, borderRadius:5, backgroundColor:"#ffffff", flexDirection:'row'}}>
                    <Text>dancok</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default StoreScreen