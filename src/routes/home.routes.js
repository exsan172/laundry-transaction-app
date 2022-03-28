import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../views/apps/home.screen";
import EmployeScreen from "../views/apps/employe.screen";
import StoreScreen from "../views/apps/store.screen"

const Tab = createBottomTabNavigator();
const HomeRoutes = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="EmployeScreen" component={EmployeScreen} />
            <Tab.Screen name="TransactionScreen" component={StoreScreen} />
            <Tab.Screen name="StoreScreen" component={StoreScreen} />
            <Tab.Screen name="SettingsScreen" component={StoreScreen} />
        </Tab.Navigator>
    )
}

export default HomeRoutes