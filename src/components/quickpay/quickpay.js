import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, Text, Pressable, Image, Dimensions } from 'react-native';
import { getData } from './../../services/services';
import CONSTANTS from './../../services/constants';
import { parseString } from 'react-native-xml2js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { LocalizationContext } from './../../locales/i18n';
const QuickPay = (props) => {
    const { translations, initializeAppLanguage,appLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    const [categories, setCategories] = useState([]);
    let services = [];
    useEffect(() => {
        let lang = appLanguage === 'en' ? '0' : '1';
        let url = CONSTANTS.server + 'default.aspx?cmd=list&lang='+lang+'&src=MP3';
        getData(url).then((xml) => {
            parseString(xml, function (err, data) {
                setCategories(data.eServiceListResponce.eServiceList[0].eCategory);
                data.eServiceListResponce.eServiceList[0].eCategory.forEach(category => {
                    category.eCompanyList[0].eCompany.forEach((eCompany) => {
                        eCompany.eServiceComp[0].eServiceCompany.forEach((eService) => {
                            let item = {
                                'id': eService.Id[0],
                                'code': eService.Code[0],
                            };
                            services.push(item);
                        });
                    });
                });
                AsyncStorage.setItem('@evdServiceItems', JSON.stringify(services));
            });
        })
    }, []);
    return (
        <View
            style={{
                flex: 1,
                padding: 10,
                backgroundColor: '#FBF8F9'
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    onPress={() => {
                        props.navigation.navigate("sub_categories", { 'item': categories[0].eCompanyList[0].eCompany[0], 'image': CONSTANTS.server + CONSTANTS.images + '1.gif' });
                    }}
                    style={{
                        elevation: 3,
                        borderRadius: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: '#EC1C24',
                        padding: 20,
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 28,
                                color: '#FFF'
                            }}>Ooredoo
                            </Text>
                            <Text
                                style={{
                                    color: '#FFF',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                            >{translations['services']}</Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: '#FFF',
                                borderRadius: 10,
                                elevation: 5,
                            }}
                        >
                            <Image
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                                source={require('./../assets/ooredoo.png')} />
                        </View>
                    </View>
                    <Button
                        title={translations['click_here']}
                        onPress={() => {
                            props.navigation.navigate("sub_categories", { 'item': categories[0].eCompanyList[0].eCompany[0], 'image': CONSTANTS.server + CONSTANTS.images + '1.gif' });
                        }}
                        titleStyle={{
                            color: 'red',
                        }}
                        containerStyle={{
                            marginTop: 15,
                        }}
                        buttonStyle={{
                            backgroundColor: '#FFF',
                            borderRadius: 40,
                        }}
                    />
                </Pressable>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 10,
                        justifyContent: 'center'
                    }}
                >
                    {/* <Pressable
                        onPress={() => {
                            props.navigation.navigate("sub_categories", { 'item': categories[0].eCompanyList[0].eCompany[0], 'image': CONSTANTS.server + CONSTANTS.images + '1.gif' });
                        }}
                        style={{
                            padding: 15,
                            width: Dimensions.get('screen').width / 2.3,
                            margin: 5,
                            elevation: 1.5,
                            alignItems: 'center',
                            borderWidth: 0,
                        }}
                    >
                        <Image
                            source={require('./../assets/ooredoo1.png')}
                            style={{
                                width: Dimensions.get('screen').width / 5,
                                height: Dimensions.get('screen').width / 5,
                            }}
                        />
                        <Text
                            style={{
                                margin: 5,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 12,
                            }}
                        >Ooredoo</Text>
                    </Pressable> */}
                    {
                        categories.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        props.navigation.navigate('service_categories', item);
                                    }}
                                    key={index}
                                    style={{
                                        padding: 15,
                                        width: Dimensions.get('screen').width / 2.3,
                                        margin: 5,
                                        elevation: 2,
                                        alignItems: 'center',
                                        borderWidth: 0,
                                        borderRadius:10,
                                        backgroundColor:'#FFF'
                                    }}
                                >
                                    <Image
                                        source={{ uri: CONSTANTS.server + 'images/main/' + index + '.png' }}
                                        style={{
                                            width: Dimensions.get('screen').width / 5.5,
                                            height: Dimensions.get('screen').width / 5.5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            margin: 5,
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                        }}
                                    >{item.Category}</Text>
                                </Pressable>
                            );
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}
export default QuickPay;