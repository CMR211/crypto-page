export default async function fetchPopularCryptos(setterFn, loadingFn) {
    loadingFn(true)
    const coins =
        'bitcoin,ethereum,cardano,ripple,binancecoin,solana,polkadot,dogecoin'
    const popularCryptosFetchOptions = {
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'json/text',
            'Content-type': 'json/text',
        },
    }
    try {
        const response = await fetch(
            popularCryptosFetchOptions.url,
            popularCryptosFetchOptions.headers
        )
        const json = await response.json()
        setterFn(json)
        loadingFn(false)
    } catch (e) {
        console.error('Fetching Popular Cryptos failed.', e)
    }
}
