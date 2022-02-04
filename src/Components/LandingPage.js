import React from 'react'
import { PageProvider } from './ContextProvider'
import { motion } from 'framer-motion'
import { pageAnimation } from '../Functions/framerVariants'
import logOnRender from '../Functions/logOnRender'

export default function LandingPage() {
    logOnRender('LandingPage')
    const { setPage } = React.useContext(PageProvider)

    return (
        <motion.div
            className='page landing-page'
            initial={pageAnimation.hidden}
            animate={pageAnimation.visible}
            exit={pageAnimation.exited}
            transition={pageAnimation.transition}>
            <h1>Quickly see your gains</h1>
            <p>
                Check most popular cryptos prices or create your crypto
                portfolio and don't miss any opportunity with this little app
                right here. Data accuracy guaranteed by coingecko.com
            </p>
            <div className='landing-page__btn-container'>
                <p>See most popular:</p>
                <button
                    onClick={() => setPage('popular-crypto')}
                    className='button-primary'>
                    Cryptos
                </button>
                <button
                    onClick={() => setPage('popular-stock')}
                    className='button-primary'>
                    Stocks
                </button>
            </div>
        </motion.div>
    )
}
