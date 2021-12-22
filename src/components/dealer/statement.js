import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Button, ListItem } from 'react-native-elements';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CONSTANTS from './../../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SunmiV2Printer from 'react-native-sunmi-v2-printer';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
const Statement = (props) => {
    const [user, setUser] = useState(undefined);
    const [list, setList] = useState([]);
    const [sales, setSales] = useState([]);
    const [footer, setFooter] = useState(undefined);
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    const e_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const a_months = [];
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['statement'],
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => { props.navigation.navigate('main') }} />,
        });
        RNFS.readFileAssets('logos/powerdby.bmp', "base64").then(data => {
            setFooter(data);
        });
        let url = CONSTANTS.server + CONSTANTS.command;
        AsyncStorage.multiGet(['@evdUser', '@evdServiceItems']).then((data) => {
            let user = JSON.parse(data[0][1]);
            setList(JSON.parse(data[1][1]));
            axios({
                url: url,
                method: 'POST',
                data: "tlid=" + user.ID + "&cmd=salesfromlastrecharge",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    setUser(user);
                    setSales(response.data.DailySales);
                })
                .catch(error => {
                    setUser(user);
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                });
        });
    }, []);
    const printSales = async () => {
        //print start
        await SunmiV2Printer.setFontSize(45);
        await SunmiV2Printer.printOriginalText(translations['statement'] + '\n');
        await SunmiV2Printer.setFontSize(25);
        await SunmiV2Printer.printOriginalText(translations['location'] + ":" + user.LocationName + '\n');
        let currentdate = new Date();
        let formatted = currentdate.getDate() + "  " + (appLanguage === "en" ? e_months[currentdate.getMonth()] : a_months[currentdate.getMonth()]) + "  " + currentdate.getFullYear() + "   "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        await SunmiV2Printer.printOriginalText(formatted + '\n');
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        let columnAliment = [0, 1, 1, 1, 2];
        let columnWidth = [16, 1, 3, 1, 8];
        await SunmiV2Printer.printColumnsText(
            ['Company', '|', 'Num', '|', 'Amount'],
            columnWidth,
            columnAliment,
        );
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        let sale_items = [];
        let total = 0;
        sales.forEach((sale) => {
            let service = getServiceById(sale[0]);
            let sale_item = [
                service.code, '|', sale[1] + "", '|', parseFloat(sale[2]).toFixed(3) + ""
            ];
            total = total + parseFloat(sale[2]);
            sale_items.push(sale_item);
        });
        sale_items.forEach(async (item) => {
            await SunmiV2Printer.printColumnsText(
                item,
                columnWidth,
                columnAliment,
            );
        });
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        await SunmiV2Printer.printColumnsText(
            ['Total', '|', '', '|', total.toFixed(3) + ""],
            columnWidth,
            columnAliment,
        );
        await SunmiV2Printer.printOriginalText('-----------------------------\n');
        await SunmiV2Printer.printOriginalText(translations['print_footer'] + '\n');
        await SunmiV2Printer.printBitmap(
            footer, 200, 100
        );
        //print end
        await SunmiV2Printer.printOriginalText('\n\n\n');
    }
    const getServiceById = (id) => {
        let service = list.find((item) => {
            if (item.id == id) {
                return true;
            }
        })
        return service;
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
                        {
                            sales.map((sale, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>{getServiceById(sale[0]).code}</ListItem.Title>
                                            <ListItem.Subtitle>{translations['total_sales'] + " - " + sale[1]}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <Text>{parseFloat(sale[2]).toFixed(3) + translations['kd']}</Text>
                                    </ListItem>
                                );
                            })
                        }
                        <View>
                            <Button
                                onPress={() => {
                                    printSales();
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
export default Statement;