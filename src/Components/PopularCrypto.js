import React from 'react'
import ContextProvider from './ContextProvider'
import CryptoCard from './CryptoCard'

export default function PopularCrypto() {

  const {cryptoData} = React.useContext(ContextProvider)

  return (
    <div className='page popular'>

      <h1>Most popular</h1>

      <div className='popular__container'>
        {Object.keys(cryptoData).sort().map((key, index) => { return (
          <CryptoCard token={key} key={'popular-card-' + index} />
        )})}
      </div>
      
    </div>
  )
}
