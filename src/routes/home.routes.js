import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

import HomeScreen from "../views/apps/home.screen";
import EmployeScreen from "../views/apps/employe.screen";
import StoreScreen from "../views/apps/store.screen"

const Tab = createBottomTabNavigator();
const HomeRoutes = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showTransaction, setShowTransacation] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal isVisible={showTransaction} style={{margin:0}} animationInTiming={500} animationOutTiming={600}>
                <View style={{backgroundColor:"#ffffff", position:'absolute', top:0, width:"100%", padding:10, borderBottomEndRadius:20, borderBottomStartRadius:20, alignItems:'center' }}>
                    <View style={{minWidth:250, paddingTop:20}}>
                        <View>
                            <View>
                                <View>
                                    <Text style={{fontSize:14, color:'#8E8E8E'}}>Store</Text>
                                </View>
                                <View style={{marginVertical:10}}>
                                    <TextInput 
                                        placeholder="Enter store if you owner." 
                                        placeholderTextColor="#9D9D9D" 
                                        style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                    />
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{fontSize:14, color:'#8E8E8E'}}>Customer</Text>
                                </View>
                                <View style={{marginVertical:10}}>
                                    <TextInput 
                                        placeholder="Enter customer name." 
                                        placeholderTextColor="#9D9D9D" 
                                        style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                    />
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={{fontSize:14, color:'#8E8E8E'}}>Total weight</Text>
                                </View>
                                <View style={{marginVertical:10}}>
                                    <TextInput 
                                        placeholder="Enter weight laundry" 
                                        placeholderTextColor="#9D9D9D" 
                                        style={{ backgroundColor: '#F8F8F8', paddingHorizontal:15, paddingVertical:8, borderRadius:10, fontSize:12, color:"#9D9D9D" }}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                                <TouchableOpacity style={{backgroundColor:"#54AEEA", padding:8, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:"#ffffff"}}>Save transaction</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', marginTop:30, marginBottom:5}}>
                            <TouchableOpacity onPress={() => setShowTransacation(false)} style={{borderWidth: 1, borderColor:"#8E8E8E", paddingVertical:5, paddingHorizontal:9, borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{color:"#8E8E8E", fontSize:10}}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={showSettings} style={{margin:0}} animationInTiming={500} animationOutTiming={600}>
                <View style={{backgroundColor:"#ffffff", padding:10, position:'absolute', bottom:0, width:"100%", borderTopRightRadius:10, borderTopLeftRadius:10, justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:300}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <Icon name="cog" size={20}/>
                                <Text style={{fontWeight:'bold', fontSize:17, marginHorizontal:5}}>Settings</Text>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text>jancok</Text>
                        <TouchableOpacity onPress={() => setShowSettings(false)}>
                            <Text>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Tab.Navigator activeColor="#54AEEA">
                <Tab.Screen 
                    name="HomeScreen" 
                    component={HomeScreen}
                    options={{
                        headerShown:false,
                        tabBarShowLabel: false,
                        tabBarIcon : ({ color }) => (
                            <Icon name="home" size={27} color={color}/>
                        ),
                        tabBarLabel: ({focus, color}) => {
                            console.log("foc => ", focus);
                        },
                        tabBarStyle: {
                            height:65
                        }
                    }}
                />

                {
                    showMenu !== true &&
                        <Tab.Screen 
                            name="StoreScreen" 
                            component={StoreScreen} 
                            options={{
                                headerShown:false,
                                tabBarShowLabel: false,
                                tabBarIcon : ({ color }) => (
                                    <Icon name="store" size={27} color={color}/>
                                ),
                                tabBarStyle: {
                                    height:65
                                }
                            }}
                        />
                }

                <Tab.Screen 
                    name="TransactionScreen" 
                    component={HomeScreen} 
                    options={{
                        headerShown:false,
                        tabBarShowLabel: false,
                        tabBarIcon : ({ color }) => (
                            <TouchableOpacity onPress={() => setShowTransacation(true)}>
                                <Image source={require("../assets/icons/plus_icon.png")} style={{ width:65, height:65 }}/>
                            </TouchableOpacity>
                        ),
                        tabBarIconStyle : {
                            position:'absolute',
                            top:-25,
                            elevation:3,
                            zIndex:3
                        },
                        tabBarStyle: {
                            height:65
                        }
                    }}
                />

                {
                    showMenu !== true &&
                    <Tab.Screen 
                        name="EmployeScreen" 
                        component={EmployeScreen}
                        options={{
                            headerShown:false,
                            tabBarShowLabel: false,
                            tabBarIcon : ({ color }) => (
                                <Icon name="account-tie" size={27} color={color}/>
                            ),
                            tabBarStyle: {
                                height:65
                            }
                        }}
                    />

                }

                <Tab.Screen 
                    name="SettingsScreen" 
                    component={HomeScreen}
                    options={{
                        headerShown:false,
                        tabBarShowLabel: false,
                        tabBarIcon : ({ color }) => (
                            <TouchableOpacity onPress={() => setShowSettings(true)}>
                                <Icon name="cog" size={27} color={color}/>
                            </TouchableOpacity>
                        ),
                        tabBarStyle: {
                            height:65
                        }
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default HomeRoutes