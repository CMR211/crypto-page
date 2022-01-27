import React from 'react'
import ContextProvider from './ContextProvider'
import StockCard from './StockCard'
import { motion } from 'framer-motion'
import {pageAnimation} from '../Functions/framerVariants'

export default function PopularStock() {
    const { popularStocks } = React.useContext(ContextProvider)
    // format:
    // change: -1.0347117
    // name: "Apple Inc."
    // price: 166.98
    // symbol: "AAPL"

    return (
        <motion.div className='page popular'            
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
