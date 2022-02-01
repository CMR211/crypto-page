import React from 'react'
import { PageProvider } from './ContextProvider'
import Safe from './Safe'
import AddAssetModal from './AddAssetModal'
import { v4 as uuidv4 } from 'uuid'
import fetchCryptoList from '../Functions/fetchCryptoList'
import getNYSETickers from '../Functions/NYSETickers.js'

function getStocksList() {
    const NYSE_STOCKS = []
    const NYSETickers = getNYSETickers()
    NYSETickers.forEach((el) => NYSE_STOCKS.push(el.name))
    return NYSE_STOCKS
}

function getNames(input, type) {
    const temp = input
        .filter((i) => {
            return i.type === type
        })
        .reduce((p, c) => p + c.name + ', ', '')
        .slice(0, -2)
    return temp
}

export default function SafeWrapper() {
    console.log('Rendering Safe')

    const { page, setPage } = React.useContext(PageProvider)

    const [personalAssets, setPersonalAssets] = React.useState()

    const [listOfPersonalCryptos, setListOfPersonalCryptos] = React.useState()
    const [listOfPersonalStocks, setListOfPersonalStocks] = React.useState()
    
    React.useEffect(() => {
        setPersonalAssets(getPersonalAssetsFromLS())
    }, [])
    
    React.useEffect(() => {
        console.log('personalAssets is changing')
        console.log(personalAssets)
        if (personalAssets) {
            setListOfPersonalCryptos(getNames(personalAssets, 'crypto'))
            setListOfPersonalStocks(getNames(personalAssets, 'stock'))
        }
    }, [personalAssets])
    
    const [allCryptosList, setAllCryptosList] = React.useState()
    const [allStocksList, setAllStocksList] = React.useState()
    React.useEffect(() => {
        fetchCryptoList(setAllCryptosList)
        setAllStocksList(getStocksList())
    }, [])

    function getPersonalAssetsFromLS() {
        if (localStorage.getItem('assets')) return
        return JSON.parse(localStorage.getItem('assets'))
    }

    function syncLS() {
        localStorage.setItem('assets', JSON.stringify(personalAssets))
    }

    return (
        <>
            {page === 'safe' && (
                <Safe
                    key={uuidv4()}
                    personalAssets={personalAssets}
                    setPage={setPage}
                />
            )}
            {page === 'add' && (
                <AddAssetModal
                    key={uuidv4()}
                    setPage={setPage}
                    syncLS={syncLS}
                    personalAssets={personalAssets}
                    setPersonalAssets={setPersonalAssets}
                    allCryptosList={allCryptosList}
                    allStocksList={allStocksList}
                />
            )}
        </>
    )
}
