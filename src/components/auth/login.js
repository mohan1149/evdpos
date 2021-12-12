import React from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { Input, Button } from 'react-native-elements';
const userLogin = (props) => {
	props.navigation.navigate('main')
}
const Login = (props) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#FFFFFF',
				padding: 15,
			}}
		>
			<ScrollView>
				<View
					style={{
						marginTop: '20%'
					}}
				>
					<Text
						style={{
							fontSize: 40,
							margin: 10,
						}}
					>Please login..</Text>
					<Input placeholder='Username'></Input>
					<Input placeholder="Pin" secureTextEntry ></Input>

					<Button title="Login" loading={false}
						buttonStyle={{
							padding: 15,
							borderRadius: 30,
							backgroundColor: 'red'
						}}
						onPress={(e) => userLogin(props)}
					/>
				</View>
				<View
					style={{
						marginTop: 20,
						display: 'flex',
						flexDirection: 'row'
					}}
				>
					<Switch />
					<Text style={{
						fontSize: 20,
					}}>Disable Pin</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						display: 'flex',
						flexDirection: 'row'
					}}
				>
					<Switch />
					<Text style={{
						fontSize: 20,
					}}>Quick Voucher</Text>
				</View>
			</ScrollView>
		</View>
	);
}
export default Login;