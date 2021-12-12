import React, { useEffect,useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getData } from './../../services/services';
import CONSTANTS from './../../services/constants';
import { parseString } from 'react-native-xml2js';
const QuickPay = (props) => {
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        let url = CONSTANTS.server + CONSTANTS.dashboard;
        getData(url).then((xml) => {
            parseString(xml, function (err, data) {
                setCategories(data.eServiceListResponce.eServiceList[0].eCategory);
             });
            // parseToJson(data).then((res)=>{
            //     console.log(res..);
            // });
        })
    },[]);
    return (
        <View>
            <ScrollView>
                {
                    categories.map((item, index) => {
                        return (
                            <ListItem bottomDivider key={index}
                                onPress={() => {
                                    props.navigation.navigate('service_categories', item);
                                }}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{item.Category}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

export default QuickPay;