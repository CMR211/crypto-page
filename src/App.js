import React from 'react'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js'
import './main.css'

import axios from 'axios'

function App() {
    // ---------------------------------------------------
    // ------------ STOCK FETCHING -----------------------
    const [stockData, setStockData] = React.useState()
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
                setStockData(stocks)
                // format:
                // change: -1.0347117
                // name: "Apple Inc."
                // price: 166.98
                // symbol: "AAPL"
            }, 300)
            console.log(stockData)
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
    const [cryptoData, setCryptoData] = React.useState()

    // fetch options for cryptocurrency API call
    const fetchOptionsCrypto = {
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'json/text',
            'Content-type': 'json/text',
        },
    }

    // fetching on app load
    React.useEffect(() => {
        // fetch cryptocurrency data (function declaration)
        async function fetchCryptoData(token) {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
                    fetchOptionsCrypto.headers
                )
                const json = await response.json()
                setTimeout(() => setCryptoData(json), 300)
            } catch (e) {
                console.log('Fetching Stock Data failed.', e)
            }
        }

        // fetch cryptocurrency data (function invoke)
        fetchCryptoData(
            'bitcoin,ethereum,cardano,ripple,binancecoin,solana,polkadot,dogecoin'
        )

        //todo: stock data: financialmodelingprep ... fmp
    }, []) // to fetch just once
    // ---------------------------------------------------

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
            cryptoData,
            stockData,
        }),
        [page]
    )

    return (
        <ContextProvider.Provider value={value}>
            <ContentWrapper />
        </ContextProvider.Provider>
    )
}

export default App
