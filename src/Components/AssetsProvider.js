import React from 'react'
import ContentWrapper from './ContentWrapper'
import { PersonalAssetsProvider } from './ContextProvider'
import fetchCryptos from '../Functions/fetchCryptos'
import fetchStocks from '../Functions/fetchStocks'

export default function AssetsProvider() {
    const [personalAssets, setPersonalAssets] = React.useState([])
    const [personalStocks, setPersonalStocks] = React.useState([])
    const [personalCryptos, setPersonalCryptos] = React.useState([])

    // Get personal assets form localStorage on app load
    React.useEffect(() => {
        // check if localstorage is available
        // if (!isStorageAvailable('localStorage')) return
        // set personalAssets from localStorage
        try {
            const json = localStorage.getItem('assets')
            const obj = JSON.parse(json)
            if (obj) setPersonalAssets(obj)
        } catch(e) {
            console.error(e)
        }
    }, [])

    React.useEffect(() => {
        if (personalAssets === undefined) return
        const personalCryptosList = []
        personalCryptosList.push(
            personalAssets.filter((item) => item.type === 'crypto')
        )
        const personalStocksList = []
        personalStocksList.push(
            personalAssets.filter((item) => item.type === 'stock')
        )
        if (personalCryptosList.length > 0) fetchCryptos(personalCryptosList, setPersonalCryptos)
        if (personalStocksList.length > 0) fetchStocks(personalStocksList, setPersonalStocks)
    }, [])

    const value = {
        personalAssets,
        setPersonalAssets,
        personalStocks,
        setPersonalStocks,
        personalCryptos,
        setPersonalCryptos,
    }

    return (
        <PersonalAssetsProvider.Provider value={value}>
            <ContentWrapper />
        </PersonalAssetsProvider.Provider>
    )
}
