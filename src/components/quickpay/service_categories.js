import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import CONSTANTS from '../../services/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
const ServiceCategories = (props) => {
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle:props.route.params.Category[0],
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => {  props.navigation.navigate('main') }} />,
        });
    });
    const companies = props.route.params.eCompanyList[0].eCompany;
    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider
                onPress={() => {
                    props.navigation.navigate("sub_categories",{'item':item,'image':CONSTANTS.server + CONSTANTS.images + item.CompanyID + '.gif'});
                }}
            >
                <Avatar source={{ uri: CONSTANTS.server + CONSTANTS.images + item.CompanyID + '.gif' }} />
                <ListItem.Content>
                    <ListItem.Title>{item.CompanyName}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    };
    return (
        <View
            style={{
                flex:1,
                backgroundColor:'#FFF'
            }}
        >
            <FlatList
                data={companies}
                renderItem={renderItem}
                keyExtractor={(item) => item.CompanyID}
            />
        </View>
    );
}

export default ServiceCategories;