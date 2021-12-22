import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet } from 'react-native';
const QuickPayF = (props) => {
    return (
        <View
            style={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap'
            }}
        >
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/0.png')} style={Styles.image }/>
                <Text style={Styles.text}>Telcom</Text>
            </View>
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/1.png')} style={Styles.image }/>
                <Text style={Styles.text}>Internet Services</Text>
            </View>
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/2.png')} style={Styles.image }/>
                <Text style={Styles.text}>Online Vouchers</Text>
            </View>
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/3.png')} style={Styles.image }/>
                <Text style={Styles.text}>Digital Games</Text>
            </View>
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/4.png')} style={Styles.image }/>
                <Text style={Styles.text}>TV Channels</Text>
            </View>
            <View style={Styles.conatiner}>
                <Image source={require('./../assets/logos/5.png')} style={Styles.image }/>
                <Text style={Styles.text}>Entertainment</Text>
            </View>
        </View>
    );
}
const Styles = StyleSheet.create({
    conatiner: {
        padding: 15,
        width: Dimensions.get('screen').width / 2.3,
        margin: 5,
        elevation: 1.5,
        alignItems: 'center',
        borderWidth:0,
    },
    image:{
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5,
    },
    text:{
        margin: 5,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,
    }
});
export default QuickPayF;