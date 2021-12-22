import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const SubCategories = (props) => {
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params.item.CompanyName[0],
            headerRight: () => <Icon style={{ marginRight: 10 }} name="home" size={25} onPress={() => {  props.navigation.navigate('main') }} />,
        });
    });
    const services = props.route.params.item.eServiceComp[0].eServiceCompany;
    const image_url = props.route.params.image;
    const company = props.route.params.item.CompanyID
    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider
                onPress={() => {
                    if(item.AmountReadOnly[0] === "true"){
                        props.navigation.navigate('denominations',{'item':item,'image':image_url,'company':company});
                    }else{
                        props.navigation.navigate('payment_input',{'item':item,'image':image_url,'company':company});
                    }
                }}
            >
                <Avatar source={{ uri: image_url }} />
                <ListItem.Content>
                    <ListItem.Title>{item.Description }</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    };
    return (
        <View
            style={{
                flex:1,
                backgroundColor:"#FFF"
            }}
        >
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id}
            />
        </View>
    );
}

export default SubCategories;