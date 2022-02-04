import React from 'react'
import { PageProvider } from '../ContextProvider'
import Safe from './Safe'
import AddAssetModal from './AddAssetModal'
import { v4 as uuidv4 } from 'uuid'
import logOnRender from '../../Functions/logOnRender'
import { AnimatePresence } from 'framer-motion'

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
    logOnRender('SafeWrapper')

    const { page, setPage } = React.useContext(PageProvider)

    const [personalAssets, setPersonalAssets] = React.useState(
        getPersonalAssetsFromLS()
    )

    const listOfAssetsToFetch = {
        cryptos: [],
        stocks: [],
    }

    React.useEffect(() => {
        setPersonalAssets(getPersonalAssetsFromLS())
    }, [])

    React.useEffect(() => {
        if (personalAssets) {
            getNames(personalAssets, 'crypto').forEach((i) =>
                listOfAssetsToFetch.cryptos.push(i.name)
            )
            getNames(personalAssets, 'stock').forEach((i) =>
                listOfAssetsToFetch.stocks.push(i.name)
            )
        }
    }, [personalAssets])

    function syncLS() {
        localStorage.setItem('assets', JSON.stringify(personalAssets))
    }

    return (
        <AnimatePresence exitBeforeEnter>
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
                />
            )}
        </AnimatePresence>
    )
}
