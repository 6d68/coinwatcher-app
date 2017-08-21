import { API_KEY, API_URL } from 'react-native-dotenv'

export async function findCurrencyInfos(currencyIds) {
    const idList = currencyIds.join(';');
    const url = `${API_URL}/prod/currencies/${idList}`;
    return createRequest(url);
}

export async function findCurrency(keyword) {
    const url = `${API_URL}/prod/currencies/search/?keyword=${keyword}`
    return createRequest(url);
};

async function createRequest(url) {
    var headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    var init = {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    };

    const request = new Request(url, init);

    let data = await (await fetch(request)
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log('Error: ', err)
        })
    )
    return data
}