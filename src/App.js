import React from 'react'
import axios from 'axios'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js'

import getNYSETickers from './Functions/NYSETickers.js'

import './main.css'

const NYSE_STOCKS = []
const NYSETickers = getNYSETickers()
NYSETickers.forEach((el) => NYSE_STOCKS.push(el.name))

function isStorageAvailable(type) {
    // checking if there is a storage available
    // type either 'local-storage' or 'session-storage'
    try {
        var storage = window[type],
            x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return false
    }
}

function saveToLS(object) {
    // first lets check if there is an item with this key in storage
    // the keys are assigned by crypto name
    if (localStorage[object.name] === undefined) {
        // if there is no such item I create it (it needs to be a string first)
        localStorage.setItem(object.name, JSON.stringify(object))
    } else {
        // if there is such an item, user probably wanted to add another transaction
        // so I am getting the existing object:
        const prevObject = JSON.parse(localStorage.getItem(object.name))
        // and then I am creating a new object using spread operators that contains
        // existing informations and a new price-volume pair (another transaction)
        const newObject = {
            ...prevObject,
            prices: [...prevObject.prices, object.prices[0]],
        }
        // lastly I am saving this new object to local storage
        localStorage.setItem(object.name, JSON.stringify(newObject))
    }
}

async function fetchPopularStocks(callbackFn) {
    // callback: setPopularStocks(stocks)
    const popularStocksFetchOptions = {
        method: 'GET',
        url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
        params: { symbols: 'aapl,gme,msft,nio,tsla,pltr,amc,intc' },
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
        setTimeout(() => {
            const array = response.data.quoteResponse.result
            const stocks = []
            array.forEach((item) => {
                const stock = {
                    symbol: item.symbol,
                    name: item.shortName,
                    price: item.regularMarketOpen,
                    change: item.regularMarketChangePercent,
                }
                stocks.push(stock)
            })
            callbackFn(stocks)
            // format:
            // change: -1.0347117
            // name: "Apple Inc."
            // price: 166.98
            // symbol: "AAPL"
        }, 500)
    } catch (e) {
        console.error('Fetching Popular Stocks failed.', e)
    }
}

async function fetchPopularCryptos(callbackFn) {
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
        setTimeout(() => callbackFn(json), 500)
    } catch (e) {
        console.error('Fetching Popular Cryptos failed.', e)
    }
}

async function fetchCryptoList(callbackFn) {
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

async function fetchStocks(stocks, callbackFn) {
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            interval: '5min',
            function: 'GLOBAL_QUOTE',
            symbol: stocks.join(','),
            datatype: 'json',
            output_size: 'compact',
        },
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key':
                '044f218bf5msh695d9c96153799bp1c58eejsn7e16c29df7a0',
        },
    }

    axios
        .request(options)
        .then(function (response) {
            callbackFn(response)
        })
        .catch(function (error) {
            console.error(error)
        })
}

async function fetchCryptos(cryptos, callbackFn) {
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

// -----------------------------------------------------------
function App() {
    // Fetching popular stocks and popular cryptos
    const [popularStocks, setPopularStocks] = React.useState()
    const [popularCryptos, setPopularCryptos] = React.useState()
    React.useEffect(() => {
        fetchPopularStocks(setPopularStocks)
        fetchPopularCryptos(setPopularCryptos)
    }, [])

    // Fetching lists of available cryptos and stocks to choose from
    const [cryptosList, setCryptosList] = React.useState()
    const [stocksList, setStocksList] = React.useState()
    React.useEffect(() => {
        fetchCryptoList(setCryptosList)
        setStocksList(NYSE_STOCKS)
    }, [])

    // Get personal assets form localStorage on app load
    const [personalAssets, setPersonalAssets] = React.useState()
    React.useEffect(() => {
        // check if localstorage is available
        if (!isStorageAvailable('localStorage')) return
        // set personalAssets from localStorage
        try {
            setPersonalAssets(JSON.parse(localStorage.getItem('assets')))
        } catch(e) {
            console.error(e)
        }
    }, [])

    // Fetching personal assets current prices
    const [personalStocksPrices, setPersonalStocksPrices] = React.useState()
    const [personalCryptosPrices, setPersonalCryptosPrices] = React.useState()
    React.useState(() => {
        // Update localStorage whenever personalAssets change
        console.log('Update localStorage whenever personalAssets change')
        localStorage.setItem('assets', JSON.stringify(personalAssets))
        // Fetching personal assets current prices
        console.log('Fetching personal assets current prices')
        if (personalAssets === undefined) return
        const personalStocks = []
        const personalCryptos = []
        console.table(personalAssets)
        personalAssets.forEach((item) => {
            if (item.type === 'stock') personalStocks.push(item.name)
            if (item.type === 'crypto') personalCryptos.push(item.name)
        })
        console.log('personalStocks:')
        console.log(personalStocks)
        console.log('personalCryptos:')
        console.log(personalCryptos)
        if (personalStocks.length > 0) {
            fetchStocks(personalStocks, setPersonalStocksPrices)
        }
        if (personalCryptos.length > 0) {
            fetchCryptos(personalCryptos, setPersonalCryptosPrices)
        }
    }, [personalAssets])

    // Current page global state
    const [page, setPage] = React.useState('landing-page')

    // useMemo to store all the global variables
    const value = React.useMemo(
        () => ({
            page,
            setPage,
            popularCryptos,
            popularStocks,
            cryptosList,
            stocksList,
            personalAssets,
            setPersonalAssets,
            personalStocksPrices,
            personalCryptosPrices,
        }),
        [personalAssets, personalStocksPrices, personalCryptosPrices, page]
    )

    // Render
    return (
        <ContextProvider.Provider value={value}>
            <ContentWrapper />
        </ContextProvider.Provider>
    )
}

export default App
