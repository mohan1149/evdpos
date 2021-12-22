import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Button } from 'react-native-elements';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CONSTANTS from './../../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SunmiV2Printer from 'react-native-sunmi-v2-printer';
import axios from 'axios';
import RNFS from 'react-native-fs';
const Balance = (props) => {
    const [user, setUser] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const [footer, setFooter] = useState(undefined);
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    const e_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const a_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    initializeAppLanguage();
    useEffect(() => {
        RNFS.readFileAssets('logos/powerdby.bmp', "base64").then(data => {
            setFooter(data);
        });
        props.navigation.setOptions({
            headerTitle: translations['dealer_balance']
        });
        let url = CONSTANTS.server + CONSTANTS.command;
        AsyncStorage.getItem('@evdUser').then((data) => {
            let user = JSON.parse(data);
            axios({
                url: url,
                method: 'POST',
                data: "tlid=" + user.ID + "&cmd=branchbalance&trmId=" + user.src,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    setBalance(response.data);
                    setUser(user);
                })
                .catch(error => {
                    setUser(user);
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                });
        });
    }, []);
    const printBalance = async () => {
        //print start

        if (appLanguage === "ar") {
            await SunmiV2Printer.setAlignment(2);
        } else {
            await SunmiV2Printer.setAlignment(0);
        }
        await SunmiV2Printer.setFontSize(45);
        await SunmiV2Printer.printOriginalText(translations['dealer_balance'] + '\n');
        await SunmiV2Printer.setFontSize(25);
        await SunmiV2Printer.printOriginalText(translations['location'] + ":" + user.LocationName + '\n');
        let currentdate = new Date();
        let formatted = currentdate.getDate() + "  " + (appLanguage === "en" ? e_months[currentdate.getMonth()] : a_months[currentdate.getMonth()]) + "  " + currentdate.getFullYear() + "   "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        await SunmiV2Printer.printOriginalText(formatted + '\n');
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        await SunmiV2Printer.printOriginalText(translations['currenet_balance'] + '\n');
        await SunmiV2Printer.setFontSize(45);
        await SunmiV2Printer.printOriginalText(parseFloat(balance.CurrentBalance).toFixed(3) + translations['kd'] + '\n');
        await SunmiV2Printer.setFontSize(25);
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        await SunmiV2Printer.printOriginalText(translations['print_footer'] + '\n');
        await SunmiV2Printer.printBitmap(
            footer, 200, 100
        );
        //print end
        await SunmiV2Printer.printOriginalText('\n\n\n');

    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF',
                padding: 15,
            }}
        >
            <ScrollView>
                {
                    user === undefined &&
                    <View
                        style={{
                            marginTop: "50%"
                        }}
                    >
                        <ActivityIndicator size="large" color="red" />
                    </View>
                }
                {
                    user !== undefined &&
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            {translations['location']}
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 25,
                            }}
                        >
                            {user.LocationName}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                marginTop: '15%'
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 7,
                                    borderColor: '#2196F3',
                                    height: 200,
                                    width: 200,
                                    borderRadius: 100,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textTransform: 'uppercase'
                                    }}
                                >{translations['balance']}</Text>
                                <Text style={{
                                    fontSize: 30,
                                    fontWeight: 'bold'
                                }}>{parseFloat(balance.CurrentBalance).toFixed(3)}</Text>
                                <Text>{translations['kd']}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: '15%'
                            }}
                        >
                            <Button
                                onPress={() => {
                                    props.navigation.navigate('recharge');
                                }}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    borderRadius: 40,
                                    padding: 10,
                                    margin: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                }}
                                title={translations['add_balance']}
                            />
                            <Button
                                onPress={() => {
                                    printBalance()
                                }}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    borderRadius: 40,
                                    padding: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    margin: 10,
                                }}
                                title={translations['print']}
                            />

                        </View>
                    </View>
                }

            </ScrollView>
        </View>
    );
}

export default Balance;