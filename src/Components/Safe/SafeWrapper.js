import React from 'react'
import { PageProvider } from '../ContextProvider'
import Safe from './Safe'
import AddAssetModal from './AddAssetModal'
import { v4 as uuidv4 } from 'uuid'
import logOnRender from '../../Functions/logOnRender'
import { AnimatePresence } from 'framer-motion'

function getPersonalAssetsFromLS() {
    if (!localStorage.getItem('assets')) return
    return JSON.parse(localStorage.getItem('assets'))
}

export default function SafeWrapper({PA}) {
    logOnRender('SafeWrapper')
    const { page, setPage } = React.useContext(PageProvider)
    const [personalAssets, setPersonalAssets] = React.useState(PA)

    function returnSymbolsToFetch() {
        const str = personalAssets
            .map((asset) => {
                if (asset.type === 'crypto') return asset.symbol + '-USD'
                if (asset.type === 'stock') return asset.symbol
            })
            .join(',')
            console.log(str)
        return str
    }

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
                    symbolsToFetch={returnSymbolsToFetch()}
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
