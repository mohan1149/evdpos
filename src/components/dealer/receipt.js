import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Button } from 'react-native-elements';
import { View, Text, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import CONSTANTS from './../../services/constants';
import { getData } from './../../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SunmiV2Printer from 'react-native-sunmi-v2-printer';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { parseString } from 'react-native-xml2js';

const Receipt = (props) => {
    const [user, setUser] = useState(undefined);
    const [receipt, setReceipt] = useState(undefined);
    const [footer, setFooter] = useState(undefined);
    const [service, setService] = useState(undefined);
    const [company, setCompany] = useState(undefined);
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    const e_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const a_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    initializeAppLanguage();
    useEffect(() => {
        RNFS.readFileAssets('logos/powerdby.bmp', "base64").then(data => {
            setFooter(data);
        });
        props.navigation.setOptions({
            headerTitle: translations['last_transaction']
        });
        let url = CONSTANTS.server + CONSTANTS.command;
        AsyncStorage.getItem('@evdUser').then((data) => {
            let user = JSON.parse(data);
            axios({
                url: url,
                method: 'POST',
                data: "tlid=" + user.ID + "&cmd=receipt",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    if (response.data.Status.Code === 0) {
                        setReceipt(response.data);
                        loadService(response.data, user);
                    } else {
                        Alert.alert(translations['server_error'], translations['server_error_msg']);
                    }
                })
                .catch(error => {
                    console.log(error);
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

    const loadService = (transaction, dealer) => {
        let service = null;
        let s_company = null;
        let url = CONSTANTS.server + 'default.aspx?cmd=list&lang=0&src=MP3';
        getData(url).then((results) => {
            parseString(results, function (err, data) {
                data.eServiceListResponce.eServiceList[0].eCategory.some(category => {
                    category.eCompanyList[0].eCompany.some((eCompany) => {
                        eCompany.eServiceComp[0].eServiceCompany.some((eService) => {
                            if (eService.Id == transaction.TransResult.SubServiceCompanyID) {
                                service = eService;
                                s_company = eCompany;
                                return true;
                            }
                        });
                        if (service !== null) {
                            return true;
                        }
                    });
                    if (service !== null) {
                        return true;
                    }
                });
            });
            setService(service);
            setCompany(s_company);
            setUser(dealer);
        });
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 15,
                backgroundColor:'#FFF'
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
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
                        <View>
                            <View
                                style={{
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    backgroundColor: 'red',
                                    marginTop: 25,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        padding: 15,
                                    }}
                                >
                                    {company !== undefined &&
                                        <Image
                                            style={{
                                                position: 'absolute',
                                                top: -25,
                                                zIndex: 5,
                                                width: 65,
                                                height: 65,
                                            }}
                                            source={{ uri: CONSTANTS.server + CONSTANTS.images + company.CompanyID[0] + '.gif' }}
                                        />
                                    }
                                    {
                                        service !== undefined &&
                                        <Text
                                            style={{
                                                textTransform: 'uppercase',
                                                color: '#FFF',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                marginTop: 30,
                                            }}
                                        >{service.PrintDescription}</Text>
                                    }
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 10,
                                            fontSize: 32,
                                            color: "#FFF"
                                        }}
                                    >{parseFloat(receipt.TransResult.AmtWithChrgs).toFixed(3) + translations['kd']}</Text>
                                </View>
                            </View>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{receipt.TransResult.Transno}</ListItem.Title>
                                    <ListItem.Subtitle>{translations['code']}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>{receipt.TransResult.Card.Description}</Text>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{parseFloat(receipt.TransResult.AmtWithChrgs).toFixed(3)}</ListItem.Title>
                                    <ListItem.Subtitle>{translations['amount']}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>

                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{receipt.TransResult.Card.Pin}</ListItem.Title>
                                    <ListItem.Subtitle>{translations['pin']}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>

                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{receipt.TransResult.Card.SerialNumber}</ListItem.Title>
                                    <ListItem.Subtitle>{translations['serial']}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                marginTop: '15%'
                            }}
                        >
                        </View>
                        <Button
                            buttonStyle={{
                                backgroundColor: 'red',
                                borderRadius: 40,
                                padding: 10,
                            }}
                            title={translations['print']}
                        />
                    </View>
                }

            </ScrollView>
        </View>
    );
}

export default Receipt;