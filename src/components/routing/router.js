import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './../auth/login';
import Main from './../home/main';

//quick pay screens
import ServiceCategories from './../quickpay/service_categories';
import SubCategories from './../quickpay/sub_categories';
import Denominations from './../quickpay/denominations';
import PaymentInput from './../quickpay/payment_input';
import PaymentConfirmation from './../quickpay/confirmation';
import InputConfirmation from './../quickpay/input_confirmation';
import Transaction from './../quickpay/transaction';
//dealer screens
import Balance from './../dealer/balance';
import DaySales from './../dealer/sales';
import PINChange from './../dealer/pin';
import Receipt from './../dealer/receipt';
import Statement from './../dealer/statement';
import Comission from './../dealer/comission';
import Recharge from './../dealer/recharge';

//sidemenu
import ContactUs from './../dealer/contact';
import About from './../dealer/about';


import { LocalizationProvider } from './../../locales/i18n';

const Stack = createStackNavigator();
const Router = () => {
    return (
        <NavigationContainer>
            <LocalizationProvider>
                <Stack.Navigator>
                    <Stack.Screen name="login" component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="main" component={Main}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="service_categories" component={ServiceCategories} />
                    <Stack.Screen name="sub_categories" component={SubCategories} />
                    <Stack.Screen name="denominations" component={Denominations} />
                    <Stack.Screen name="payment_input" component={PaymentInput} />
                    <Stack.Screen name="confirmation" component={PaymentConfirmation} />
                    <Stack.Screen name="input_confirmation" component={InputConfirmation} />
                    <Stack.Screen name="transaction" component={Transaction} />
                    <Stack.Screen name="balance" component={Balance} />
                    <Stack.Screen name="day_sales" component={DaySales} />
                    <Stack.Screen name="pin_change" component={PINChange} />
                    <Stack.Screen name="receipt" component={Receipt} />
                    <Stack.Screen name="statement" component={Statement} />
                    <Stack.Screen name="comission" component={Comission} />
                    <Stack.Screen name="recharge" component={Recharge} />

                    <Stack.Screen name="contact" component={ContactUs} />
                    <Stack.Screen name="about" component={About} />

                </Stack.Navigator>
            </LocalizationProvider>
        </NavigationContainer>
    );
}

export default Router;