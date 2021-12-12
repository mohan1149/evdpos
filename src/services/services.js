import React from 'react';
import axios from 'axios';
const TOKEN="1";
export async function getData(url) {
    let response = await axios({
        url: 'https://evdpostest.ooredoo.com.kw/ePosProvider/default.aspx?cmd=list&src=MP3&lang=en',
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




export async function postData(url, data) {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
        }
    }
    let response = await axios.post(url, data, config)
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