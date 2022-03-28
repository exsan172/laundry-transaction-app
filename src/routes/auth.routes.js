import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil'

import LoginScreen from '../views/auth/login.screen';
import RegisterScreen from '../views/auth/register.screen';
import ForgotPassScreen from '../views/auth/forgot_password.screen';
import HomeRoutes from './home.routes';

const Stack = createNativeStackNavigator();
const AuthRoutes = () => {
    return (
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        options={{
                            headerShown: false
                        }}
                        component={LoginScreen}
                    />
                    <Stack.Screen 
                        name="RegisterScreen" 
                        options={{
                            headerShown: false
                        }}
                        component={RegisterScreen} 
                    />
                    <Stack.Screen 
                        name="ForgotPassScreen"
                        options={{
                            headerShown: false
                        }}
                        component={ForgotPassScreen} 
                    />
                    <Stack.Screen 
                        name="HomeRoutes" 
                        options={{
                            headerShown: false
                        }}
                        component={HomeRoutes} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    );
}

export default AuthRoutes;