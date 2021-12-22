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
import DatePicker from 'react-native-date-picker'
const DaySales = (props) => {
    const [user, setUser] = useState(undefined);
    const [list, setList] = useState([]);
    const [sales, setSales] = useState([]);
    const [footer, setFooter] = useState(undefined);
    const [datePicker, openDatePicker] = useState(false);
    const [dateObt, setDateObj] = useState(new Date());
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    let today = dateObt.getFullYear() + "-" + (dateObt.getMonth() + 1) + "-" + dateObt.getDate();
    const [date, setDate] = useState(today);
    const e_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const a_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['day_sales'],
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
                data: "tlid=" + user.ID + "&cmd=salesbydate&salesday=" + date + "&trmId=" + user.src,
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
        await SunmiV2Printer.printOriginalText(translations['day_sales'] + '\n');
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
    const reloadSales = (selected) =>{
        let url = CONSTANTS.server + CONSTANTS.command;
        AsyncStorage.multiGet(['@evdUser', '@evdServiceItems']).then((data) => {
            let user = JSON.parse(data[0][1]);
            setList(JSON.parse(data[1][1]));
            console.log(date);
            axios({
                url: url,
                method: 'POST',
                data: "tlid=" + user.ID + "&cmd=salesbydate&salesday=" + selected + "&trmId=" + user.src,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    setUser(user);
                    setSales(response.data.DailySales);
                    console.log(response.data.DailySales);
                })
                .catch(error => {
                    setUser(user);
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                });
        });
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
                        <DatePicker
                            modal
                            mode='date'
                            open={datePicker}
                            date={dateObt}
                            onConfirm={(d) => {
                                openDatePicker(false);
                                setUser(undefined);
                                setDateObj(d);
                                let selected = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                                setDate(selected);
                                reloadSales(selected);
                            }}
                            onCancel={() => {
                                openDatePicker(false);
                            }}
                        />
                        <Button
                            onPress={() => {
                                openDatePicker(true);
                            }}
                            title={date}
                            buttonStyle={{
                                borderRadius: 40,
                            }}
                            icon={<Icon name='calendar' color='#FFF' style={{ marginRight: 10 }} />}
                        />
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
export default DaySales;