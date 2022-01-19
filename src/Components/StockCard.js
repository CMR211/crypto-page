import React from 'react'
import ContextProvider from './ContextProvider'

export default function CryptoCard( {token} ) {

  // destructuring Context object since I only need cryptoData in this component
  const {stockData} = React.useContext(ContextProvider)

  // round daily change to #.## format
  const change24 = Math.round(stockData[token].usd_24h_change * 100) / 100

  // when daily change is negative its color is red, otherwise green
  function getChangeColor() {
    if (change24 <= 0) return 'popular-card__change-red'
    if (change24 > 0) return 'popular-card__change-green'
  }

  // when clicking on a coin container I want to see detailed info, so it redirects to coinmarketcap
  function gotoLink() {
    const url = 'https://coinmarketcap.com/currencies/'
    if (token === 'binancecoin') return url + 'bnb'
    if (token === 'polkadot') return url + 'polkadot-new'
    return url + token
  }

  return (
    <div className={`popular-card popular-card-${token}`} onClick={event => window.location.href = gotoLink()}>

      <img className='popular-card__icon' src={`/assets/${token}.png`} alt={`${token}-icon`} />

      <p className='popular-card__title'>{token.toUpperCase()}</p>

      <p className='popular-card__price'>
        {stockData[token].usd.toLocaleString()}
        <span className='popular-card__price__usd'>USD</span>
      </p>

      <p className={'popular-card__change ' + getChangeColor()}>{`(${change24}%)`}</p>

    </div>
  )
}
