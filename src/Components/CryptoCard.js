import React from 'react'
import {PopularCryptosAndStocksProvider} from './ContextProvider.js'

export default function CryptoCard( {cryptoName, popularCryptos} ) {

  // round daily change to #.## format
  const change24 = Math.round(popularCryptos[cryptoName].usd_24h_change * 100) / 100

  // when daily change is negative its color is red, otherwise green
  function getChangeColor() {
    if (change24 <= 0) return 'popular-card__change-red'
    if (change24 > 0) return 'popular-card__change-green'
  }

  // when clicking on a coin container I want to see detailed info, so it redirects to coinmarketcap
  function gotoLink() {
    const url = 'https://coinmarketcap.com/currencies/'
    if (cryptoName === 'binancecoin') return url + 'bnb'
    if (cryptoName === 'polkadot') return url + 'polkadot-new'
    return url + cryptoName
  }

  return (
    <a className='popular-card__link' href={gotoLink()}>
      <div className={`popular-card popular-card-${cryptoName}`} onClick={event => window.location.href = gotoLink()}>

        <img className='popular-card__icon' src={`/assets/${cryptoName}.png`} alt={`${cryptoName}-icon`} />

        <p className='popular-card__title'>{cryptoName.toUpperCase()}</p>

        <p className='popular-card__price'>
          {popularCryptos[cryptoName].usd.toLocaleString()}
          <span className='popular-card__price__usd'>USD</span>
        </p>

        <p className={'popular-card__change ' + getChangeColor()}>{`(${change24}%)`}</p>

      </div>
    </a>
  )
}
