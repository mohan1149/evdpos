import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CONSTANTS from './../../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
const Comission = (props) => {
    const [user, setUser] = useState(undefined);
    const [commission, setCommission] = useState(undefined);
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['commission']
        });
        let url = CONSTANTS.server + CONSTANTS.command;
        AsyncStorage.getItem('@evdUser').then((data) => {
            let user = JSON.parse(data);
            axios({
                url: url,
                method: 'POST',
                data: "cmd=commission&trmId=" + user.src + "&tlid=" + user.ID,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setCommission(response.data);
                    setUser(user);
                })
                .catch(error => {
                    setUser(user);
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                });
        });
    }, []);

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
                        <View>
                            {commission.Status.Code === 2 &&
                                <View
                                    style={{
                                        backgroundColor: 'red',
                                        padding: 25,
                                        borderRadius: 10,
                                        marginTop: 50,
                                    }}
                                >
                                    <Icon
                                        size={45}
                                        name='info-circle'
                                        color='red'
                                        style={{
                                            position: 'absolute',
                                            top: -30,
                                            zIndex: 5,
                                            borderRadius: 4,
                                            alignSelf: 'center',
                                            backgroundColor: '#FFF',
                                            padding: 5,
                                            elevation: 4,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#FFF',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            marginTop: 15,
                                        }}
                                    >
                                        {commission.Status.Description}
                                    </Text>
                                </View>
                            }
                            {commission.Amount !== 0 &&
                                <View
                                    style={{
                                        backgroundColor: 'red',
                                        padding: 25,
                                        borderRadius: 10,
                                        marginTop: 50,
                                    }}
                                >
                                    <Icon
                                        size={45}
                                        name='check-circle'
                                        color='red'
                                        style={{
                                            position: 'absolute',
                                            top: -30,
                                            zIndex: 5,
                                            borderRadius: 4,
                                            alignSelf: 'center',
                                            backgroundColor: '#FFF',
                                            padding: 5,
                                            elevation: 4,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#FFF',
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                            textAlign: 'center',
                                            marginTop: 15,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {translations['amount']}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#FFF',
                                            fontWeight: 'bold',
                                            fontSize: 35,
                                            textAlign: 'center',
                                            marginTop: 10,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {parseFloat(commission.Amount).toFixed(3) + translations['kd']}
                                    </Text>
                                </View>
                            }
                            {
                                commission !== undefined &&
                                <View>
                                    <ListItem bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title>{parseFloat(commission.PreviousBalance).toFixed(3)}</ListItem.Title>
                                            <ListItem.Subtitle>{translations['previous_balance']}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title>{parseFloat(commission.CurrentBalance).toFixed(3)}</ListItem.Title>
                                            <ListItem.Subtitle>{translations['current_balance']}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                </View>
                            }
                        </View>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

export default Comission;