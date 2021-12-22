import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import QuickPay from './../quickpay/quickpay';
import Dealer from './../dealer/dealer';
import Promotions from './../promotions/promos';

const Tab = createBottomTabNavigator();

export default function BottomBar() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="QuickPay"
                options={{
                    tabBarLabel: 'QuickPay',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    tabBarActiveTintColor:'red',
                }}
                component={QuickPay} />
            <Tab.Screen name="Dealer" component={Dealer}
                options={{
                    tabBarLabel: 'Dealer',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                    tabBarActiveTintColor:'red',
                }}
            />
            <Tab.Screen name="Promotions" component={Promotions}
                options={{
                    tabBarLabel: 'Promotions',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="gift" color={color} size={size} />
                    ),
                    tabBarActiveTintColor:'red',
                }}
            />
        </Tab.Navigator>
    );
}