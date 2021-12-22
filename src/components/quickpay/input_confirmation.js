import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { ListItem, Input, Button } from 'react-native-elements';
import CONSTANTS from '../../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputConfirmation = (props) => {
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    const [user, setUser] = useState(undefined);
    const [disablePin, setDisablePin] = useState("0");
    const [pin, setPin] = useState();
    const [loading, setLoading] = useState(false);
    let lang = appLanguage === 'en' ? '0' : '1';
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params.name,
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => { props.navigation.navigate('main') }} />,
        });
        AsyncStorage.multiGet(['@evdUser', '@evdDisablePin']).then((data) => {
            setUser(JSON.parse(data[0][1]));
            setDisablePin(data[1][1]);
        });
    }, []);
    const pay_item = props.route.params.inputs;
    const initiatePayment = () => {
        if (disablePin === "0") {
            if (pin !== user.Password) {
                Alert.alert(translations['invalid_pin'], translations['request_pin_again']);
                setLoading(false);
            } else {
                executePayment();
            }
        } else {
            executePayment();
        }


    }
    const executePayment = () => {
        let url = CONSTANTS.server + CONSTANTS.command;
        let service = props.route.params.service[0];
        setLoading(true);
        axios({
            url: url,
            method: 'POST',
            data: "sid=" + service + "&amt=" + pay_item.amount + "&chrg=0.0&lang=" + lang + "&acc=&src=MP3&locMobNo=" + props.route.params.inputs.mobile + "&objectid=&ctid=&pmtid=&contlist=&contamts=&cardnumber=&cmd=process&tlid=" + user.ID + "&trmId=" + user.src,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((response) => {
                setLoading(false);
                props.navigation.navigate('transaction', { 'data': response.data, 'inputs': props.route.params.inputs });
            })
            .catch((error) => {
                setLoading(false);
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
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{props.route.params.name}</ListItem.Title>
                        <ListItem.Subtitle>{translations['service']}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{pay_item.amount}</ListItem.Title>
                        <ListItem.Subtitle>{translations['amount_to_pay']}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{pay_item.mobile}</ListItem.Title>
                        <ListItem.Subtitle>{translations['mobile']}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>0.000</ListItem.Title>
                        <ListItem.Subtitle>{translations['admin_charges']}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{parseFloat(pay_item.amount).toFixed(3)}</ListItem.Title>
                        <ListItem.Subtitle>{translations['total_amount']}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                {
                    disablePin === "0" &&
                    <Input
                        containerStyle={{
                            marginTop: 15
                        }}
                        placeholder={translations['pin']}
                        keyboardType="decimal-pad"
                        secureTextEntry
                        value={pin}
                        onChangeText={(e) => {
                            setPin(e);
                        }}
                    />

                }
                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Button
                        loading={loading}
                        title={translations['proceed']}
                        buttonStyle={{
                            backgroundColor: 'red',
                            borderRadius: 40,
                            padding: 10,
                        }}
                        onPress={() => {
                            initiatePayment();
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default InputConfirmation;