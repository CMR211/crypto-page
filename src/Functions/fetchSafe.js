import axios from 'axios'

export default async function fetchPopularStocks(query, setterFn, loadingFn) {
    // this function fetches popular stocks
    // it takes 2 functions as arguments:
    // - setterFn is the react set function from React.useState()
    //   that you are using to set fetched data to react state
    // - loadingFn is react set state function representing loading state in a component

    loadingFn(true)
    const popularStocksFetchOptions = {
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
        const response = await axios.request(popularStocksFetchOptions)
        console.log(response)
        const array = await response.data.quoteResponse.result
        const assets = []
        array.forEach((item) => {
            const stock = {
                symbol: item.symbol,
                name: item.shortName,
                price: item.regularMarketOpen,
                change: item.regularMarketChangePercent,
            }
            assets.push(stock)
        })
        setterFn(assets)
        loadingFn(false)
    } catch (e) {
        console.error('Fetching Popular Stocks failed.', e)
    }
}
