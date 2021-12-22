import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, Image, Alert, ActivityIndicator, Modal } from 'react-native';
import { LocalizationContext } from './../../locales/i18n';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../../services/constants';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { parseString } from 'react-native-xml2js';
const PaymentInput = (props) => {
    const [mobile, setMobile] = useState(null);
    const [lcMobile, setLcMobile] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState(null);
    const [modal, showModal] = useState(true);
    const [quickVoucher, setQuickVoucher] = useState(undefined);
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [operators, setOperators] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState();
    const [wrongNumber, setWrongNumber] = useState(false);
    initializeAppLanguage();
    const item = props.route.params;
    let lang = appLanguage === 'en' ? '0' : '1';
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: item.item.PrintDescription[0],
        })
        AsyncStorage.multiGet(['@evdUser', '@evdQuickVoucher']).then((data) => {
            let u_data = JSON.parse(data[0][1]);
            setUser(u_data);
            setQuickVoucher(data[1][1]);
            getCountries(u_data.ID);
        });
    }, []);
    const getCountries = (uid) => {
        let url = CONSTANTS.server + CONSTANTS.default;
        axios({
            url: url,
            method: 'POST',
            data: "cmd=countrylist&src=MP3&tlid=" + uid + "&lang=" + lang + "&sid=" + item.item.Id[0],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                parseString(response.data, function (err, data) {
                    setCountries(data.eCountryDetails.CountryList[0].eCountryList);
                    showModal(false);
                });
            })
            .catch(error => {
                console.log(error);
                showModal(false);
            });
    }
    const getOperators = (acc) => {
        showModal(true);
        let url = CONSTANTS.server + CONSTANTS.default;
        let uid = user.ID;
        axios({
            url: url,
            method: 'POST',
            data: "cmd=operatorlist&src=MP3&tlid=" + uid + "&acc=" + acc + "&countrycode=" + selectedCountry + "&sid=55&objectid=&lang=" + lang,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                showModal(false);
                parseString(response.data, function (err, data) {
                    if (data.eCountryOperatorList.status[0].Code[0] === "2") {
                        setWrongNumber(data.eCountryOperatorList.status[0].Description);
                    } else {

                    }
                    //setOperators(data.eCountryOperatorList.Countrylist[0].eCountryList);
                });
            })
            .catch(error => {
                console.log(error);
                showModal(false);
            });
    }
    const processRequest = () => {
        if (mobile !== null && amount !== null) {
            if (quickVoucher === "0") {
                props.navigation.navigate('input_confirmation',
                    {
                        'service': item.item.Id,
                        'name': item.item.PrintDescription[0],
                        'inputs': {
                            'mobile': mobile,
                            'email': email,
                            'amount': amount,
                        }
                    }
                );
            } else {
                executePayment();
            }
        } else {
            Alert.alert(translations['required_fields'], translations['request_required_fields']);
        }
    }
    const executePayment = () => {
        let url = CONSTANTS.server + CONSTANTS.command;
        showModal(true);
        axios({
            url: url,
            method: 'POST',
            data: "sid=" + item.item.Id + "&amt=" + amount + "&chrg=0.0&lang=" + lang + "&acc=&src=MP3&locMobNo=" + mobile + "&objectid=&ctid=&pmtid=&contlist=&contamts=&cardnumber=&cmd=process&tlid=" + user.ID + "&trmId=" + user.src,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((response) => {
                showModal(false);
                props.navigation.navigate('transaction', { 'data': response.data, 'inputs': { 'mobile': mobile, 'email': email } });
            })
            .catch((error) => {
                showModal(false);
                Alert.alert(translations['server_error'], translations['server_error_msg']);
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
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                        }}
                    >{translations['fill_required_fields']}</Text>
                    <Image source={{ uri: item.image }} style={{
                        width: 70,
                        height: 70,
                        marginRight: 15,
                    }} />
                </View>
                <Modal transparent={true} visible={modal}
                >
                    <ActivityIndicator
                        style={{
                            marginTop: '80%',
                        }}
                        size="large" color="red"></ActivityIndicator>
                </Modal>
                <View
                    style={{
                        marginTop: "10%"
                    }}
                >
                    {
                        item.item.ServiceTypeID[0] === "8" &&
                        <View
                            style={{
                                borderBottomWidth: 1,
                                margin: 8,
                            }}
                        >
                            <Picker
                                selectedValue={selectedCountry}
                                onValueChange={(itemValue) => {
                                    setSelectedCountry(itemValue);
                                    setMobile(itemValue.MSISDCode[0]);
                                }}
                            >
                                <Picker.Item
                                    label={translations['country']}
                                    value={{
                                        Code: ['00'],
                                        MSISDCode: ['CC'],
                                        Name: ['Country']

                                    }}
                                />
                                {
                                    countries.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.Name[0]}
                                                value={item}
                                                key={index}
                                            />
                                        );
                                    })
                                }
                            </Picker>
                        </View>
                    }
                    <Input
                        placeholder={translations['mobile']}
                        leftIcon={<Icon name='phone' size={24} color='black' />}
                        value={mobile}
                        onChangeText={(t) => {
                            setMobile(t);
                        }}
                        onBlur={() => {
                            getOperators(mobile);
                        }}
                        keyboardType="phone-pad"
                        containerStyle={{
                            marginBottom: -20,
                        }}
                        errorMessage={wrongNumber}
                    />
                    {
                        item.item.ServiceTypeID[0] === "8" &&
                        <View
                            style={{
                                borderBottomWidth: 1,
                                margin: 8,
                            }}
                        >
                            <Picker
                                selectedValue={selectedOperator}
                                onValueChange={(itemValue) => {
                                    setSelectedOperator(itemValue);
                                }}
                            >
                                <Picker.Item label={translations['operator']} value={translations['operator']} />
                                {
                                    operators.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.Operators[0]}
                                                value={item.Operators[0]}
                                                key={index}
                                            />
                                        );
                                    })
                                }
                            </Picker>
                        </View>
                    }
                    {
                        item.item.ServiceTypeID[0] === "8" &&
                        <Input
                            placeholder={translations['local_mobile']}
                            leftIcon={<Icon name='phone' size={24} color='black' />}
                            value={lcMobile}
                            onChangeText={(t) => {
                                setLcMobile(t);
                            }}
                            keyboardType="phone-pad"
                            containerStyle={{
                                marginBottom: -20,
                            }}
                        />
                    }
                    <Input
                        placeholder={translations['email']}
                        leftIcon={<Icon name='envelope' size={24} color='black' />}
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t);
                        }}
                        containerStyle={{
                            marginBottom: -20,
                        }}
                    />
                    <Input
                        keyboardType="numeric"
                        placeholder={translations['amount_to_pay']}
                        leftIcon={<Icon name='money' size={24} color='black' />}
                        onChangeText={(t) => {
                            setAmount(t);
                        }}
                        value={amount}
                        containerStyle={{
                            marginBottom: -20,
                        }}
                    />
                </View>
                <View
                    style={{
                        marginTop: '10%'
                    }}
                >
                    <Button
                        disabled={wrongNumber === false ? true : false}
                        title={translations['pay']}
                        buttonStyle={{
                            backgroundColor: 'red',
                            padding: 10,
                            borderRadius: 40,

                        }}
                        onPress={() => {
                            processRequest();
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
export default PaymentInput;