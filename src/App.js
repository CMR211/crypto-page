import React from 'react'
import axios from 'axios'

import AssetsProvider from './Components/AssetsProvider.js'
import {PopularCryptosAndStocksProvider} from './Components/ContextProvider.js'
import './main.css'

import fetchPopularStocks from './Functions/fetchPopularStocks'
import fetchPopularCryptos from './Functions/fetchPopularCryptos'
import fetchCryptoList from './Functions/fetchCryptoList'
import getNYSETickers from './Functions/NYSETickers.js'
const NYSE_STOCKS = []
const NYSETickers = getNYSETickers()
NYSETickers.forEach((el) => NYSE_STOCKS.push(el.name))


// -----------------------------------------------------------
function App() {
    console.log('Rendering App')
    // // Fetching popular stocks and popular cryptos
    // const [popularStocks, setPopularStocks] = React.useState()
    // const [popularCryptos, setPopularCryptos] = React.useState()
    // React.useEffect(() => {
    //     fetchPopularStocks(setPopularStocks)
    //     fetchPopularCryptos(setPopularCryptos)
    // }, [])

    // Fetching lists of available cryptos and stocks to choose from
    const [cryptosList, setCryptosList] = React.useState()
    const [stocksList, setStocksList] = React.useState()
    React.useEffect(() => {
        fetchCryptoList(setCryptosList)
        setStocksList(NYSE_STOCKS)
    }, [])

    const value = {
        cryptosList,
        stocksList,
    }

    // Render
    return (
        <PopularCryptosAndStocksProvider.Provider value={value}>
            <AssetsProvider />
        </PopularCryptosAndStocksProvider.Provider>
    )
}

export default App
