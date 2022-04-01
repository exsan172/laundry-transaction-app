import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";

import { modalCreateTransaction, modalSettings } from '../store'
import HomeScreen from "../views/apps/home.screen";
import EmployeScreen from "../views/apps/employe.screen";
import StoreScreen from "../views/apps/store.screen"
import ModalsCreateTransaction from "../components/modals_create_transaction.components";
import ModalsSettings from "../components/modals_settings.components";

const Tab = createBottomTabNavigator();
const HomeRoutes = () => {
    const [showMenu, setShowMenu]                = useState(false)
    const [showTransaction, setShowTransacation] = useRecoilState(modalCreateTransaction)
    const [showSettings, setShowSettings]        = useRecoilState(modalSettings)

    useEffect(() => {
        checkRole()
    }, [])

    const checkRole = async () => {
        const token       = await AsyncStorage.getItem("token_key")
        const decodeToken = jwtDecode(token)

        if(decodeToken.role !== "owner") {
            setShowMenu(true)
        }
    }

    return (
        <>
            <ModalsCreateTransaction/>
            <ModalsSettings/>
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
                            <TouchableOpacity onPress={() => setShowTransacation(true)} style={{backgroundColor:"#ffffff", padding:7, height:80, borderRadius:100}}>
                                <Image source={require("../assets/icons/plus_icon.png")} style={{ width:50, height:50 }}/>
                            </TouchableOpacity>
                        ),
                        tabBarIconStyle : {
                            position:'absolute',
                            top:20,
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