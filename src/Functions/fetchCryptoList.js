export default async function fetchCryptoList(callbackFn) {
    const cryptoListFetchOptions = {
        url: 'https://api.coingecko.com/api/v3/coins/list',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'json/text',
            'Content-type': 'json/text',
        },
    }
    try {
        const response = await fetch(
            cryptoListFetchOptions.url,
            cryptoListFetchOptions.headers
        )
        const json = await response.json()
        setTimeout(() => {
            callbackFn(json)
        }, 1000) // set to 1s since the list is huge
    } catch (e) {
        console.error('Fetching Coins List failed.', e)
    }
}
