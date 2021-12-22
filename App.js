/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Router from './src/components/routing/router';
import codePush from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  SplashScreen.hide();
  return (
    <Router />
  );
};


export default codePush(App);
