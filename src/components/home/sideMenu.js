import React from 'react';
import { View, ScrollView, Share } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
const SideMenu = (props) => {
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

                    }}
                >
                    <Icon name='home' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>Quick Pay</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='user' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>Dealer</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='android' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>About App</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='gift' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>Promotions</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='users' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>About Us</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='envelope' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>Contact Us</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {

                    }}
                >
                    <Icon name='globe' size={25} />
                    <ListItem.Content>
                        <ListItem.Title>Language</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider
                    onPress={() => {
                        props.navigation.dispatch(DrawerActions.toggleDrawer());
                        onShare();
                    }}
                >
                    <Icon name='share' size={25}/>
                    <ListItem.Content>
                        <ListItem.Title>Share</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </ScrollView>
        </View>
    );
}
export default SideMenu;