import React from 'react'
import ContextProvider from './ContextProvider'

export default function LandingPage() {

  const {setPage} = React.useContext(ContextProvider)

  return (
    <div className='page landing-page'>
      <h1>Quickly see your gains</h1>
      <p>Check most popular cryptos prices or create your crypto portfolio and don't miss any opportunity with this little app right here. Data accuracy guaranteed by coingecko.com</p>
      <button onClick={() => setPage('popular-crypto')} className='button-primary'>Let's go</button>
    </div>
  )
}
