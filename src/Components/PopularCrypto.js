import React from 'react'
import CryptoCard from './CryptoCard'
import { motion } from 'framer-motion'
import { pageAnimation } from '../Functions/framerVariants'
import fetchPopularCryptos from '../Functions/fetchPopularCryptos'

export default function PopularCrypto() {
    // Fetching popular cryptos
    const [popularCryptos, setPopularCryptos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    React.useEffect(() => {
        fetchPopularCryptos(setPopularCryptos, setLoading)
    }, [])

    function LoadingComponent() {
        return (
            <div className='loadingComponent page'>
                <h2>Popular cryptos are being loaded...</h2>
            </div>
        )
    }

    function LoadedComponent() {
        return (
            <div className='popular__container'>
                {Object.keys(popularCryptos)
                    .sort()
                    .map((cryptoName, index) => {
                        return (
                            <CryptoCard
                                cryptoName={cryptoName}
                                key={'popular-card-' + index}
                                popularCryptos={popularCryptos}
                            />
                        )
                    })}
            </div>
        )
    }

    return (
        <motion.div
            className='page popular'
            initial={pageAnimation.hidden}
            animate={pageAnimation.visible}
            exit={pageAnimation.exited}
            transition={pageAnimation.transition}>
            <h1>Most popular cryptos</h1>
            {isLoading ? <LoadingComponent /> : <LoadedComponent />}
        </motion.div>
    )
}
