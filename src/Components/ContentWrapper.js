import React from 'react'
import Navbar from './Navbar.js'
import LandingPage from './LandingPage.js'
import { PageProvider } from './ContextProvider.js'
import PopularCrypto from './PopularCrypto.js'
import PopularStock from './PopularStock.js'
import SafeWrapper from './Safe/SafeWrapper.js'
import { AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';

export default function ContentWrapper() {
    console.log('Rendering ContentWrapper')

    const [page, setPage] = React.useState('landing-page')
    const value = { page, setPage }
    return (
        <PageProvider.Provider value={value}>
            <AnimatePresence exitBeforeEnter>
                {page === 'landing-page' && <LandingPage key={uuidv4()} />}
                {page === 'popular-crypto' && <PopularCrypto key={uuidv4()} />}
                {page === 'popular-stock' && <PopularStock key={uuidv4()} />}
                {page === 'safe' && <SafeWrapper key={uuidv4()} />}
            </AnimatePresence>
            <Navbar key={uuidv4()} />
        </PageProvider.Provider>
    )
}
