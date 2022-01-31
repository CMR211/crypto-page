export default async function fetchCryptos(cryptos, callbackFn) {
    const coins = cryptos.join(',')
    const cryptosFetchOptions = {
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'json/text',
            'Content-type': 'json/text',
        },
    }
    try {
        const response = await fetch(
            cryptosFetchOptions.url,
            cryptosFetchOptions.headers
        )
        const json = await response.json()
        setTimeout(() => callbackFn(json), 500)
    } catch (e) {
        console.error('Fetching Popular Cryptos failed.', e)
    }
}
