import React, { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { Input, Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, View,Text } from 'react-native';
const Transaction = (props) => {
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    const [mobile, setMobile] = useState(props.route.params.inputs.mobile);
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['transaction_report'],
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => {  props.navigation.navigate('main') }} />,
        });
    }, []);
    const transaction = props.route.params.data;
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
                <View>
                    {
                        transaction.Status.Code === 0 &&
                        <View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '5%',
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 5,
                                        borderRadius: 100,
                                        width: 120,
                                        height: 120,
                                        borderColor: '#2196F3',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon name='check' color='red' size={50}></Icon>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginTop: 20,
                                }}
                            >
                                <View>
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{parseFloat(transaction.TransRequest.Amount).toFixed(3) + ' ' + translations['kd']}</ListItem.Title>
                                            <ListItem.Subtitle>{translations['amount']} </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{transaction.TransResult.Transno}</ListItem.Title>
                                            <ListItem.Subtitle>{translations['trans_no']} </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{   transaction.TransResult.TransactionTime}</ListItem.Title>
                                            <ListItem.Subtitle> {translations['trans_time']} </ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                </View>
                            </View>
                            <View>
                                <Input
                                    placeholder={translations['mobile']}
                                    leftIcon={<Icon name='phone' size={20} />}
                                    value={mobile}
                                    onChangeText={(m) => {
                                        setMobile(m);
                                    }}
                                    keyboardType="phone-pad"
                                />
                                <Button title={translations['confirm']}
                                    icon={<Icon name='paper-plane' color='#FFF' style={{ marginRight: 10 }} />}
                                    buttonStyle={{
                                        backgroundColor: 'red',
                                        borderRadius: 40,
                                        padding: 10,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                    }}
                                />
                            </View>
                        </View>
                    }
                    {
                        transaction.Status.Code !== 0 &&
                        <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '20%',
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 5,
                                        borderRadius: 100,
                                        width: 150,
                                        height: 150,
                                        borderColor: '#2196F3',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon name='times' color='red' size={80}></Icon>
                                </View>
                                <Text
                                    style={{
                                        margin:15,
                                        marginTop:'10%',
                                        textAlign:'center',
                                        fontSize:22,
                                    }}
                                >{translations['transaction_failed']}</Text>
                            </View>
                    }

                </View>
            </ScrollView>
        </View>
    );
}

export default Transaction;