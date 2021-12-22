import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView, Text, Image, Alert, ActivityIndicator, Modal } from 'react-native';
import { LocalizationContext } from './../../locales/i18n';
import { ListItem, Badge, Input } from 'react-native-elements';
import CONSTANTS from '../../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseString } from 'react-native-xml2js';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const Denominations = (props) => {
    const [denominations, setDenominations] = useState([]);
    const [quickVoucher, setQuickVoucher] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [modal, showModal] = useState(false);
    const { translations, initializeAppLanguage, appLanguage } = useContext(LocalizationContext);
    let lang = appLanguage === 'en' ? '0' : '1';
    initializeAppLanguage();
    const item = props.route.params;
    console.log(item);
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: item.item.PrintDescription[0],
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => { props.navigation.navigate('main') }} />,
        });
        AsyncStorage.multiGet(['@evdUser', '@evdQuickVoucher']).then((data) => {
            let user = JSON.parse(data[0][1]);
            let url = CONSTANTS.server + CONSTANTS.default;
            setQuickVoucher(data[1][1]);
            setUser(user);
            axios({
                url: url,
                method: 'POST',
                data: "cmd=pinlist&src=MP4&tlid=" + user.ID + "&sid=" + props.route.params.item.Id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    parseString(response.data, function (err, data) {
                        setLoading(false);
                        if (data.TransProductListResponce.ProductList[0] !== '') {
                            setDenominations(data.TransProductListResponce.ProductList[0].ECard);
                        }
                    });
                })
                .catch(error => {
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                });
        });
    }, []);
    const executePayment = (denomnination) => {
        let url = CONSTANTS.server + CONSTANTS.command;
        showModal(true);
        axios({
            url: url,
            method: 'POST',
            data: "sid=" + item.item.Id + "&amt=" + denomnination.Value[0] + "&chrg=0.0&lang=" + lang + "&pid=" + denomnination.Id[0] + "&acc=&src=MP3&locMobNo=" + mobile + "&objectid=&ctid=&pmtid=&contlist=&contamts=&cardnumber=&cmd=process&tlid=" + user.ID + "&trmId=" + user.src,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then((response) => {
                showModal(false);
                props.navigation.navigate('transaction', {
                    'data': response.data, 'inputs': {
                        'mobile': mobile,
                        'email': email,
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Alert.alert(translations['server_error'], translations['server_error_msg']);
            });
    }
    const processRequest = (denomnination) => {
        if (quickVoucher !== "0") {
            if (mobile === null || mobile === "") {
                Alert.alert(translations['enter_mobile'], translations['request_mobile_number']);
            } else {
                executePayment(denomnination);
            }
        } else {
            if (mobile === null || mobile === "") {
                Alert.alert(translations['enter_mobile'], translations['request_mobile_number']);
            } else {
                props.navigation.navigate('confirmation',
                    {
                        'item': denomnination,
                        'name': item.item.PrintDescription[0],
                        'service': item.item.Id,
                        'inputs': {
                            'mobile': mobile,
                            'email': email,
                        }
                    }
                );
            }
        }
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
                            width: 190,
                        }}
                    >{translations['select_from_list']}</Text>
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
                            marginTop: '100%',
                        }}
                        size="large" color="red"></ActivityIndicator>
                </Modal>
                {loading &&
                    <View style={{
                        marginTop: "50%"
                    }}>
                        <ActivityIndicator size="large" color="red"></ActivityIndicator>
                    </View>
                }
                <View
                    style={{
                        marginTop: "10%"
                    }}
                >
                    {!loading &&
                        <View>
                            <Input
                                placeholder={translations['mobile']}
                                leftIcon={<Icon name="phone" size={20} />}
                                value={mobile}
                                keyboardType="phone-pad"
                                onChangeText={(t) => {
                                    setMobile(t);
                                }}
                            />
                            <Input
                                placeholder={translations['email']}
                                leftIcon={<Icon name="envelope" size={20} />}
                                value={email}
                                onChangeText={(t) => {
                                    setEmail(t);
                                }}
                            />
                        </View>
                    }
                    {
                        denominations.map((denomination, index) => {
                            return (
                                denomination.Active[0] !== "false" &&
                                <ListItem
                                    onPress={() => {
                                        processRequest(denomination);
                                    }}
                                    bottomDivider
                                    key={index}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{denomination.Description}</ListItem.Title>
                                        <ListItem.Subtitle>{denomination.Value}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <Badge
                                        value={denomination.Active[0] === "false" ? translations['inactive'] : translations['active']}
                                        status={denomination.Active[0] === "false" ? "error" : "success"}
                                        badgeStyle={{
                                            margin: 5
                                        }}
                                    />
                                </ListItem>
                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}
export default Denominations;