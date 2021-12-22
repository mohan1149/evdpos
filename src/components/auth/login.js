import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import CONSTANTS from '../../services/constants';
import axios from 'axios';
import RNSimData from 'react-native-sim-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from './../../locales/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {
	const { translations, initializeAppLanguage } = useContext(LocalizationContext);
	initializeAppLanguage();
	const [imei] = useState(RNSimData.getSimInfo().deviceId0);
	const [carrier] = useState(RNSimData.getSimInfo().carrierName0);
	const [deviceId] = useState(RNSimData.getSimInfo().simSerialNumber0);
	const [user, setUser] = useState(undefined);
	const [pin, setPin] = useState(undefined);
	const [disablePin, setDisablePin] = useState(false);
	const [quickVoucher, setQuickVoucher] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		AsyncStorage.multiGet(['@evdUser', '@evdDisablePin', '@evdQuickVoucher']).then((data) => {
			if (data[0][1] !== null) {
				let userData = JSON.parse(data[0][1]);
				setUser(userData.Username);
			}
			if (data[1][1] === "1") {
				setDisablePin(true);
			}
			if (data[2][1] === "1") {
				setQuickVoucher(true);
			}
		});
	}, []);
	const userLogin = (props) => {
		setLoading(true);
		let url = CONSTANTS.server + CONSTANTS.command;
		let username = user;
		let password = pin;
		let lang = 0;
		let terminalId = imei;
		let serialNumber = deviceId;
		let networkName = carrier;
		axios({
			url: url,
			method: 'POST',
			data: "cmd=terminallogin&lusr=" + username + "&lpswd=" + password + "&lang=" + lang + "&trmid=" + terminalId + "&imsi=" + serialNumber + "&ver=1&netname=" + networkName,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then((response) => {
				setLoading(false);
				if (response.data.Status.Code === -1) {
					Alert.alert(translations['login_failed'], translations['invalid_credits']);
				} else if (response.data.Status.Code === 0) {
					AsyncStorage.setItem('@evdUser', JSON.stringify(response.data.Info));
					if (disablePin === true) {
						AsyncStorage.setItem('@evdDisablePin', "1");
					}else{
						AsyncStorage.setItem('@evdDisablePin', "0");
					}
					if (quickVoucher === true) {
						AsyncStorage.setItem('@evdQuickVoucher', "1");
					}else{
						AsyncStorage.setItem('@evdQuickVoucher', "0");
					}
					props.navigation.navigate('main');
				}
			})
			.catch(error => {
				setLoading(false);
				Alert.alert(translations['login_failed'], translations['invalid_credits']);
				console.log(error);
			});
	}
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
					>{translations['please_login']}</Text>
					<Input placeholder={translations['username']}
						onChangeText={e => {
							setUser(e)
						}}
						value={user}

						leftIcon={<Icon name='user' size={24} color='red' />}
					/>
					<Input placeholder={translations['pin']} secureTextEntry
						keyboardType="decimal-pad"
						onChangeText={e => {
							setPin(e)
						}}
						leftIcon={<Icon name='lock' size={24} color='red' />}
					/>

					<Button title={translations['login']} loading={loading}
						buttonStyle={{
							padding: 10,
							borderRadius: 30,
							backgroundColor: 'red'
						}}
						containerStyle={{
							marginTop:"5%"
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
					<Switch
						value={disablePin}
						thumbColor={disablePin ? "red" : "#f4f3f4"}
						onValueChange={val => {
							setDisablePin(val);
						}}
					/>
					<Text style={{
						fontSize: 20,
					}}>{translations['disable_pin']}</Text>
				</View>
				<View
					style={{
						marginTop: 20,
						display: 'flex',
						flexDirection: 'row'
					}}
				>
					<Switch
						thumbColor={quickVoucher ? "red" : "#f4f3f4"}
						value={quickVoucher}
						onValueChange={val => {
							setQuickVoucher(val);
						}}
					/>
					<Text style={{
						fontSize: 20,
					}}>{translations['quick_voucher']}</Text>
				</View>
			</ScrollView>
		</View>
	);
}
export default Login;