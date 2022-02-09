import axios from 'axios'

export default async function fetchSafe(query, setterFn, loadingFn) {
    // this function fetches popular stocks
    // it takes 2 functions as arguments:
    // - setterFn is the react set function from React.useState()
    //   that you are using to set fetched data to react state
    // - loadingFn is react set state function representing loading state in a component

    loadingFn(true)
    const fetchOptions = {
        method: 'GET',
        url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
        params: { symbols: query },
        headers: {
            'x-rapidapi-host':
                'stock-data-yahoo-finance-alternative.p.rapidapi.com',
            'x-rapidapi-key':
                '044f218bf5msh695d9c96153799bp1c58eejsn7e16c29df7a0',
            'Access-Control-Allow-Origin': '*',
        },
    }

    try {
        const response = await axios.request(fetchOptions)
        console.log(response)
        const array = await response.data.quoteResponse.result
        const assets = array.map(fetchedItem => {return (
            {
                symbol: fetchedItem.symbol,
                name: fetchedItem.shortName,
                price: fetchedItem.regularMarketOpen,
                change: fetchedItem.regularMarketChangePercent,
                image: fetchedItem.coinImageUrl,
            }
        )})
        setterFn(assets)
        loadingFn(false)
    } catch (e) {
        console.error('Fetching personal assets data failed.', e)
    }
}
