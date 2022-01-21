import React from 'react'
import Navbar from './Navbar.js'
import LandingPage from './LandingPage.js'
import ContextProvider from './ContextProvider.js'
import PopularCrypto from './PopularCrypto.js'
import PopularStock from './PopularStock.js'
import Safe from './Safe.js'
import { AnimatePresence, motion } from 'framer-motion'

export default function ContentWrapper() {
    const { page } = React.useContext(ContextProvider)

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {page === 'landing-page' && <LandingPage key={1} />}
                {page === 'popular-crypto' && <PopularCrypto key={2} />}
                {page === 'popular-stock' && <PopularStock key={3} />}
                {page === 'safe' && <Safe key={4} />}
            </AnimatePresence>
            <Navbar key={5} />
        </>
    )
}
