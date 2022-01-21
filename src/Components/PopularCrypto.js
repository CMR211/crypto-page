import React from 'react'
import ContextProvider from './ContextProvider'
import CryptoCard from './CryptoCard'
import { motion } from 'framer-motion'
import {pageAnimation} from '../Functions/framerVariants'

export default function PopularCrypto() {

  const {cryptoData} = React.useContext(ContextProvider)

  return (
    <motion.div className='page popular'             
    initial={pageAnimation.hidden}
    animate={pageAnimation.visible}
    exit={pageAnimation.exited}
    transition={pageAnimation.transition}>

      <h1>Most popular cryptos</h1>

      <div className='popular__container'>
        {Object.keys(cryptoData).sort().map((key, index) => { return (
          <CryptoCard token={key} key={'popular-card-' + index} />
        )})}
      </div>
      
    </motion.div>
  )
}
