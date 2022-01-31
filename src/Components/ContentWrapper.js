import React from 'react'
import Navbar from './Navbar.js'
import LandingPage from './LandingPage.js'
import {PageProvider} from './ContextProvider.js'
import PopularCrypto from './PopularCrypto.js'
import PopularStock from './PopularStock.js'
import Safe from './Safe.js'
import { AnimatePresence } from 'framer-motion'
import AddAssetModal from './AddAssetModal.js'

export default function ContentWrapper() {
    console.log('Rendering ContentWrapper')

    const [page, setPage] = React.useState('landing-page')
    const value = { page, setPage }
    return (
        <PageProvider.Provider value={value}>
            <AnimatePresence exitBeforeEnter>
                {page === 'landing-page' && <LandingPage key={1} />}
                {page === 'popular-crypto' && <PopularCrypto key={2} />}
                {page === 'popular-stock' && <PopularStock key={3} />}
                {page === 'safe' && <Safe key={4} />}
                {page === 'add' && <AddAssetModal key={5} />}
            </AnimatePresence>
            <Navbar key={6} />
        </PageProvider.Provider>
    )
}
