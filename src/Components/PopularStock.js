import React from 'react'
import StockCard from './StockCard'
import { motion } from 'framer-motion'
import { pageAnimation } from '../Functions/framerVariants'
import fetchPopularStocks from '../Functions/fetchPopularStocks.js'
import logOnRender from '../Functions/logOnRender'

export default function PopularStock() {
    logOnRender('PopularStock')
    // format:
    // change: -1.0347117
    // name: "Apple Inc."
    // price: 166.98
    // symbol: "AAPL"
    const [popularStocks, setPopularStocks] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        fetchPopularStocks(setPopularStocks, setIsLoading)
    }, [])

    function LoadingComponent() {
        return (
            <div className='loadingComponent page'>
                <h2>Popular stocks are being loaded...</h2>
            </div>
        )
    }

    function LoadedComponent() {
        return (
            <motion.div
                className='page popular'
                initial={pageAnimation.hidden}
                animate={pageAnimation.visible}
                exit={pageAnimation.exited}
                transition={pageAnimation.transition}>
                <h1>Most popular stocks</h1>

                <div className='popular__container'>
                    {popularStocks.map((object, index) => {
                        return (
                            <StockCard
                                stock={object}
                                key={'popular-stock-' + index}
                            />
                        )
                    })}
                </div>
            </motion.div>
        )
    }

    return isLoading ? <LoadingComponent /> : <LoadedComponent />
}
