import React, { useEffect } from "react";
import { BackHandler } from 'react-native';
import Sidebar from './sidebar';
const Main = (props) => {
    useEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
    return (
        <>
            <Sidebar {...props} />
        </>

    );
}
export default Main;