import React from 'react'
import { PageProvider } from '../ContextProvider'
import Safe from './Safe'
import AddAssetModal from './AddAssetModal'
import { v4 as uuidv4 } from 'uuid'
import logOnRender from '../../Functions/logOnRender'
import { AnimatePresence } from 'framer-motion'

export default function SafeWrapper({PA}) {
    logOnRender('SafeWrapper')
    const { page, setPage } = React.useContext(PageProvider)
    const [personalAssets, setPersonalAssets] = React.useState(PA)

    function returnSymbolsToFetch() {
        if (!personalAssets) return null
        const str = personalAssets
            .map((asset) => {
                if (asset.type === 'crypto') return asset.symbol + '-USD'
                if (asset.type === 'stock') return asset.symbol
            })
            .join(',')
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
                    setPersonalAssets={setPersonalAssets}
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
