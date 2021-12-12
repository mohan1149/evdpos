import React from 'react';
import { View, FlatList, Pressable,Text,Dimensions } from 'react-native';
const QuickPayF = (props) => {
    let items = ['Telcom', 'Online Vouchers', 'TV Channles', 'Digital Games', 'Internet Services', 'Entertainment'];
    const renderItem = ({ item }) => (

        <Pressable
            style={{
                borderRadius:5,
                //borderWidth:1,
                padding:20,
                margin:10,
                width:Dimensions.get('screen').width/2.5,
                elevation:3,
            }}
            onPress={()=>{
                props.navigation.navigate('service_categories',item);
            }}
        >
            <Text style={{
                textAlign:'center'
            }}>{ item }</Text>
        </Pressable>
    );
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF',
                padding: 15,
            }}
        >
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item}
                numColumns={2}
            />
            {/* <ScrollView>
                {
                    items.map((item, index) => {
                        return (
                            <ListItem bottomDivider key={index}
                                onPress={()=>{
                                    props.navigation.navigate('service_categories',item);
                                }}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{ item }</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        );
                    })
                }
            </ScrollView> */}
        </View>
    );
}

export default QuickPayF;