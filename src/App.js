import React from 'react'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js'
import './main.css'

import axios from 'axios'

function storageAvailable(type) {
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
// -----------------------------------------------------------
function App() {
    // ---------------------------------------------------
    // ------------ STOCK FETCHING -----------------------
    const [popularStockData, setPopularStockData] = React.useState()
    const stockOptions = {
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
    async function fetchStockData() {
        try {
            const response = await axios.request(stockOptions)
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
                setPopularStockData(stocks)
                // format:
                // change: -1.0347117
                // name: "Apple Inc."
                // price: 166.98
                // symbol: "AAPL"
            }, 300)
        } catch (e) {
            console.log('Fetching Stock Data failed.', e)
        }
    }

    React.useEffect(() => {
        fetchStockData()
    }, [])

    // ---------------------------------------------------
    // --------- CRYPTO FETCHING -------------------------

    // cryptocurrency data state
    const [popularCryptoData, setPopularCryptoData] = React.useState()
    const [cryptoList, setCryptoList] = React.useState()
    const [personalCrypto, setPersonalCrypto] = React.useState()
    const [personalAssets, setPersonalAssets] = React.useState(null)

    // ---------------------------------------------------
    // get personal coins list form localstorage
    React.useEffect(() => {
        if (!storageAvailable('localStorage')) return
        const array = []
        for (let i = 0; i < localStorage.length; i++) {
            const obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
            array.push(obj)
        }
        console.log(localStorage)
        setPersonalAssets(localStorage)
        console.log('--------------------')
        console.log('Personal assets:')
        console.log(personalAssets)
        console.log('--------------------')
    }, [])
    // ---------------------------------------------------

    // ---------------------------------------------------
    // fetch options for cryptocurrency API call
    const fetchOptionsCrypto = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'json/text',
            'Content-type': 'json/text',
        },
    }
    // ---------------------------------------------------

    // Fetching popular cryptocurrency
    React.useEffect(() => {
        // fetch cryptocurrency data (function declaration)
        async function fetchPopularCryptoData(token) {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
                    fetchOptionsCrypto.headers
                )
                const json = await response.json()
                setTimeout(() => setPopularCryptoData(json), 300)
            } catch (e) {
                console.log('Fetching Stock Data failed.', e)
            }
        }

        // fetch cryptocurrency data (function invoke)
        fetchPopularCryptoData(
            'bitcoin,ethereum,cardano,ripple,binancecoin,solana,polkadot,dogecoin'
        )

        //todo: stock data: financialmodelingprep ... fmp
    }, [])
    // ---------------------------------------------------

    // ---------------------------------------------------
    // fetch Coins List
    React.useEffect(() => {
        // fetch cryptocurrency data (function declaration)
        async function fetchCoinsList() {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/list',
                    fetchOptionsCrypto.headers
                )
                const json = await response.json()
                setTimeout(() => {
                    setCryptoList(json)
                }, 1000)
            } catch (e) {
                console.error('Fetching Coins List failed.', e)
            }
        }

        // fetch cryptocurrency coins list (function invoke)
        fetchCoinsList()
    }, [])
    // ---------------------------------------------------

    // ---------------------------------------------------
    // fetch personal coins
    React.useEffect(() => {
        // fetch cryptocurrency data (function declaration)
        async function fetchPersonalCrypto(coins) {
            try {
                const query = coins.filter((item) => item.type === 'crypto')
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
                    fetchOptionsCrypto.headers
                )
                const json = await response.json()
                // 0: [array]
                // id: "01coin"
                // name: "01coin"
                // symbol: "zoc"
                setTimeout(() => {
                    setPersonalCrypto(json)
                    console.log('personal crypto data')
                    console.log(personalCrypto)
                }, 1000)
            } catch (e) {
                console.log('Fetching Personal Crypto Data failed.', e)
            }
        }

        // fetch cryptocurrency coins list (function invoke)
        console.log('personalCryptoList:')
        console.log(personalAssets.join(','))
        fetchPersonalCrypto(personalAssets.join(','))
    }, [personalAssets]) // to fetch just once

    // i can add new global state in the context which will be -1 or +1 and a button to change the state,
    // then it is possible to add a listener here in useEffect so that i can have refresh button

    // todo: ad locale button (is it necessary though?)
    // const [locale, setLocale] = React.useState('en')
    // function toggleLocale () {
    //   if (locale === 'en') {setLocale('pl')} else {setLocale('en')}
    // }

    // current page global state
    const [page, setPage] = React.useState('landing-page')

    // useMemo to store all the global variables
    const value = React.useMemo(
        () => ({
            page,
            setPage,
            popularCryptoData,
            cryptoList,
            setPersonalAssets,
            personalAssets,
            personalCrypto,
            popularStockData,
        }),
        [page, personalAssets]
    )

    return (
        <ContextProvider.Provider value={value}>
            <ContentWrapper />
        </ContextProvider.Provider>
    )
}

export default App
