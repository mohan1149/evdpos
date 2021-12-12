import React from 'react';
import BottomBar from "./bottonBar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu from './sideMenu';
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const Sidebar = (props) => {
    let navigation = props.navigation;
    return (
        <Drawer.Navigator
            drawerContent={(props) => <SideMenu {...props} />}
        >
            <Drawer.Screen name="botton_tabs" component={BottomBar}
                options={{
                    headerTitle: 'ePosDealer',
                    headerTitleAlign: 'center',
                    headerLeft: () => <Image source={require('./../assets/logo.png')}
                        style={{
                            height: 40,
                            width: 100,
                        }}
                    />,
                    headerRight: () => <Icon style={{marginRight:10}} name="bars" size={25} onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }} />,
                }}
            />
        </Drawer.Navigator>
    );
}
export default Sidebar;