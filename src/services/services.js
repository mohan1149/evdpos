import { parseString } from 'react-native-xml2js';
import axios from 'axios';
const TOKEN = "1";
export async function getData(url) {
    let response = await axios({
        url: url,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
        }
    })
        .then((results) => {
            console.log('NETWORK URL: ' + url);
            return results.data;
        })
        .catch((error) => {
            console.log('NETWORK ERROR: ' + error);
            return false;
        });
    return response;
}
