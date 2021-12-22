import React, { useContext } from 'react';
import { LocalizationContext } from './../../locales/i18n';
import { View, ScrollView, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
const Dealer = (props) => {
    const { translations, initializeAppLanguage } = useContext(LocalizationContext);
    initializeAppLanguage();
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FBF8F9',
                paddingTop: 15,
            }}
        >
            <ScrollView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('balance')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['balance']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/balance.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('day_sales')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['day_sales']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/sales.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('pin_change')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['pin']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/pin.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('receipt')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['receipt']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/receipt.png')} />
                        </Card>
                    </Pressable>

                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('statement')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['statement']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/statement.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('comission')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['commission']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/commission.png')} />
                        </Card>
                    </Pressable>

                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            props.navigation.navigate('recharge')
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title style={Styles.pressableText}>{translations['recharge']}</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/recharge.png')} />
                        </Card>
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}
const Styles = StyleSheet.create({
    pressableContainer: {
        margin: 5,
    },
    pressableCard: {
        borderWidth: 0,
        elevation: 0,
        margin: 0,
        elevation: 5,
        borderRadius:10,
        backgroundColor:'#FFF',
        width: Dimensions.get('screen').width / 3.3,
    },
    pressableImage: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    pressableText:{
        fontSize:12,
        textTransform:'uppercase'
    }
});

export default Dealer;