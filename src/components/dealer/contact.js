import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { LocalizationContext } from './../../locales/i18n';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const ContactUs = (props) => {
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: translations['contact_us'],
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
            <ScrollView>
                <View>
                    <ListItem>
                        <Icon name='map-marker' size={30} color='red' />
                        <ListItem.Content>
                            <ListItem.Title>Ooredoo Tower, 15th Floor, Al Soor Street, Al Kuwayt</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem>
                        <Icon name='phone' size={30} color='red' />
                        <ListItem.Content>
                            <ListItem.Title>(965) 1805555</ListItem.Title>

                        </ListItem.Content>
                    </ListItem>
                    <ListItem>
                        <Icon name='mobile' size={40} color='red' />
                        <ListItem.Content>
                            <ListItem.Title>(965) 69079465</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem>
                        <Icon name='envelope' size={20} color='red' />
                        <ListItem.Content>
                            <ListItem.Title numberOfLines={2}>P.O. Box 613,Safat,13007,Kuwait</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </ScrollView>
        </View>
    );
}

export default ContactUs;