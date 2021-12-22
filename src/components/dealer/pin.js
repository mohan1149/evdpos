import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Button, Input, Alert } from 'react-native-elements';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CONSTANTS from '../../services/constants';
const PINChange = (props) => {
    const [user, setUser] = useState();
    const [oldPin, setOldPin] = useState();
    const [newPin, setNewPin] = useState();
    const [confirmPin, setConfirmPin] = useState();
    const [loading, setLoading] = useState(false);
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['change_pin']
        });
        AsyncStorage.getItem('@evdUser').then(data => {
            setUser(JSON.parse(data));
        });
    }, []);

    const validateInput = () => {
        if (newPin !== undefined && newPin !== "2") {
            if (newPin !== confirmPin) {
                alert('both  pins shouid be same');
            } else if (oldPin === user.Password) {
                //console.log(user);
                changePin();
            } else {
                alert('incorrect old pin');
            }
        } else {
            alert('enter new pin');
        }
    }

    const changePin = () => {
        setLoading(true);
        let url = CONSTANTS.server + CONSTANTS.command;
        console.log();
        axios({
            url: url,
            method: 'POST',
            data: "cmd=pinchange&lusr=" + user.Username + "&lpswd=" + oldPin + "&cpin=" + newPin + "&uid=" + user.UserId + "&tlid=" + user.ID,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                setLoading(false);
                if (response.data.Status.Code === 0) {
                    props.navigation.navigate('login');
                }else{
                    Alert.alert(translations['server_error'], translations['server_error_msg']);
                }
            })
            .catch(error => {
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
            <ScrollView>
                <View>
                    <Input
                        keyboardType="phone-pad"
                        value={oldPin}
                        onChangeText={(t) => {
                            setOldPin(t);
                        }}
                        placeholder={translations['old_pin']}
                    />
                    <Input
                        keyboardType="phone-pad"
                        value={newPin}
                        onChangeText={(t) => {
                            setNewPin(t);
                        }}
                        placeholder={translations['new_pin']}
                    />
                    <Input
                        keyboardType="phone-pad"
                        value={confirmPin}
                        onChangeText={(t) => {
                            setConfirmPin(t);
                        }}
                        placeholder={translations['confirm_pin']}
                    />
                    <Button
                        loading={loading}
                        onPress={() => {
                            validateInput();
                        }}
                        title={translations['change']}
                        buttonStyle={{
                            backgroundColor: 'red',
                            borderRadius: 40,
                            padding: 10,
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default PINChange;