import React from 'react'
import Navbar from './Navbar.js'
import LandingPage from './LandingPage.js'
import ContextProvider from './ContextProvider.js'
import Popular from './Popular.js'

export default function ContentWrapper() {

  const {page} = React.useContext(ContextProvider)

  return (
    <>
      {(page === 'landing-page') && <LandingPage />}
      {(page === 'popular') && <Popular />}
      {/* <Navbar /> */}
    
    </>
  )
}
