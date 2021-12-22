import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { LocalizationContext } from './../../locales/i18n';
const About = (props) => {
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['about_us'],
        });
    }, []);
    return (
        <View
            style={{
                flex: 1,
                padding: 15,
                backgroundColor: '#FFF'
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text
                        style={{
                            fontSize:18,
                        }}
                    >{translations['about_us_content']}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default About;