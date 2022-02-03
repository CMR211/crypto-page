export default async function fetchCryptoList(setterFn, loadingFn) {
    loadingFn(true)
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
        setterFn(json)
        loadingFn(false)
        console.log('%cFetching Coins List succedded.', 'color:green; font-weight:bold')
        console.table(json)
    } catch (e) {
        console.error('%c Fetching Coins List failed.', 'color:red; font-weight:bold', e)
        loadingFn('error')
        return(e)
    }
}
