import React from 'react'
import { PageProvider } from '../ContextProvider'
import Safe from './Safe'
import AddAssetModal from './AddAssetModal'
import { v4 as uuidv4 } from 'uuid'
import fetchCryptoList from '../../Functions/fetchCryptoList'
import getNYSETickers from '../../JSON/NYSETickers.js'

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

function getPersonalAssetsFromLS() {
    if (!localStorage.getItem('assets')) return
    console.dir(localStorage.getItem('assets'))
    return JSON.parse(localStorage.getItem('assets'))
}

export default function SafeWrapper() {
    console.log('Rendering SafeWrapper')

    const { page, setPage } = React.useContext(PageProvider)

    const [personalAssets, setPersonalAssets] = React.useState(
        getPersonalAssetsFromLS()
    )
    const [allCryptosList, setAllCryptosList] = React.useState()
    const [allStocksList, setAllStocksList] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    const listOfAssetsToFetch = {
        cryptos: [],
        stocks: [],
    }

    React.useEffect(() => {
        setPersonalAssets(getPersonalAssetsFromLS())
        fetchCryptoList(setAllCryptosList, setIsLoading)
        setAllStocksList(getStocksList())
    }, [])

    React.useEffect(() => {
        console.log('Rendering SafeWrapper because personalAssets is changing')
        console.log(personalAssets)
        if (personalAssets) {
            getNames(personalAssets, 'crypto').forEach((i) =>
                listOfAssetsToFetch.cryptos.push(i.name)
            )
            getNames(personalAssets, 'stock').forEach((i) =>
                listOfAssetsToFetch.stocks.push(i.name)
            )
        }
    }, [personalAssets])

    React.useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    function syncLS() {
        localStorage.setItem('assets', JSON.stringify(personalAssets))
    }

    function LoadingElement() {
        return (
            <div className='page'>
                <h2>Your assets are loading...</h2>
            </div>
        )
    }

    function ErrorElement() {
        return (
            <div className='page'>
                <h2>
                    There was an error while loading your assets. Please try
                    again later.
                </h2>
            </div>
        )
    }

    function LoadedElement() {
        return (
            <>
                {page === 'safe' && (
                    <Safe
                        key={uuidv4()}
                        personalAssets={personalAssets}
                        setPage={setPage}
                        listOfAssetsToFetch={listOfAssetsToFetch}
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

    return isLoading === 'error'
        ? ErrorElement()
        : isLoading === true
        ? LoadingElement()
        : LoadedElement()
}
