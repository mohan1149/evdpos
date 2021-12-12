import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './../auth/login';
import Main from './../home/main';
import ServiceCategories from './../quickpay/service_categories';

const Stack = createStackNavigator();
const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} 
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen name="main" component={Main} 
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen name="service_categories" component={ServiceCategories}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;