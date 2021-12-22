import React, { useContext } from 'react';
import { View, ScrollView, Share } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LocalizationContext } from './../../locales/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
const SideMenu = (props) => {
    const {
        appLanguage,
        translations,
        initializeAppLanguage,
        setAppLanguage,
    } = useContext(LocalizationContext);
    initializeAppLanguage();
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <View>
            <ScrollView>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('QuickPay');
                    }}
                >
                    <Icon name='home' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['quickpay']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('Dealer');
                    }}
                >
                    <Icon name='user' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['dealer']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('about');
                    }}
                >
                    <Icon name='android' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['about_app']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('Promotions');
                    }}
                >
                    <Icon name='gift' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['promotions']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('about');
                    }}
                >
                    <Icon name='users' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['about_us']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('contact');
                    }}
                >
                    <Icon name='envelope' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['contact_us']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        const lang = appLanguage === "en" ? "ar" : "en";
                        setAppLanguage(lang);
                    }}
                >
                    <Icon name='globe' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{appLanguage === "en" ? 'العربية' : 'English'}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.dispatch(DrawerActions.toggleDrawer());
                        onShare();
                    }}
                >
                    <Icon name='share' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['share']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.navigate('login');
                      
                    }}
                >
                    <Icon name='lock' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>{translations['logout']}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

            </ScrollView>
        </View>
    );
}
export default SideMenu;