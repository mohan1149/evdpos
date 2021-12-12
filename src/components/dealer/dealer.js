import React from 'react';
import { View, ScrollView, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { printTest } from './../print/printer';
const Dealer = (props) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                paddingTop:15,
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
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Balance</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/balance.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Day Sales</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/sales.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>PIN</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/pin.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Receipt</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/receipt.png')} />
                        </Card>
                    </Pressable>

                    <Pressable
                        style={Styles.pressableContainer}
                        onPress={() => {
                            printTest();
                        }}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Statement</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/statement.png')} />
                        </Card>
                    </Pressable>
                    <Pressable
                        style={Styles.pressableContainer}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Comission</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/comission.png')} />
                        </Card>
                    </Pressable>

                    <Pressable
                        style={Styles.pressableContainer}
                    >
                        <Card
                            containerStyle={Styles.pressableCard}
                        >
                            <Card.Title>Reacharge</Card.Title>
                            <Image style={Styles.pressableImage} source={require('./../assets/dealer/reacharge.png')} />
                        </Card>
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}
const Styles = StyleSheet.create({
    pressableContainer: {
        margin:4,
        elevation:5,
        backgroundColor:'#FFFFFF',
    },
    pressableCard: {
        borderWidth:0,
        elevation:0,
        margin:0,
        width: Dimensions.get('screen').width / 3.3,
    },
    pressableImage: {
        width: 50,
        height: 50,
        alignSelf:'center'
    }
});

export default Dealer;