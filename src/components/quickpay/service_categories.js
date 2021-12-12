import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import CONSTANTS from '../../services/constants';
const ServiceCategories = (props) => {
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Company List',
        });

    });
    const companies = props.route.params.eCompanyList[0].eCompany;
    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider
                onPress={() => {
                    console.log(item.eServiceComp);
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
        <View>
            <FlatList
                data={companies}
                renderItem={renderItem}
                keyExtractor={(item) => item.CompanyID}
            />
        </View>
    );
}

export default ServiceCategories;