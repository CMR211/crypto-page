export default async function fetchCryptos(cryptos, setterFn, loadingFn) {
    loadingFn(true)
    const cryptosFetchOptions = {
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
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
        setterFn(json)
        loadingFn(false)
    } catch (e) {
        console.error('Fetching Popular Cryptos failed.', e)
    }
}
