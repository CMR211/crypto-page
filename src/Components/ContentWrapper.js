import React from 'react'
import Navbar from './Navbar.js'
import LandingPage from './LandingPage.js'
import ContextProvider from './ContextProvider.js'
import PopularCrypto from './PopularCrypto.js'
import PopularStock from './PopularStock.js'

export default function ContentWrapper() {

  const {page} = React.useContext(ContextProvider)

  return (
    <>
      {(page === 'landing-page') && <LandingPage />}
      {(page === 'popular-crypto') && <PopularCrypto />}
      {(page === 'popular-stock') && <PopularStock />}
      {(page !== 'landing-page') && <Navbar />}
    
    </>
  )
}
