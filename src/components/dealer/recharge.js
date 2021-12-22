import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Button, Input } from 'react-native-elements';
import { View, ScrollView } from 'react-native';

const Recharge = (props) => {
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['recharge']
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
                <View>
                    <Input
                        placeholder={translations['card_number']}
                    />
                    <Input
                        placeholder={translations['pin']}
                    />
                    <Input
                        placeholder={translations['recharge_pin']}
                    />
                    <Input
                        placeholder={translations['amount']}
                    />
                    <Button
                        title={translations['recharge']}
                        buttonStyle={{
                            backgroundColor:'red',
                            borderRadius:40,
                            padding:10,
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Recharge;