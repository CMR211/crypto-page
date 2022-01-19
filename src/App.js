import React from 'react'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js';
import './main.css'

function App() {

  // cryptocurrency data state
  const [cryptoData, setCryptoData] = React.useState();

  // fetch options for cryptocurrency API call
  const fetchOptionsCrypto = {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'json/text',
      'Content-type': 'json/text',
    }
  }

  // fetching on app load
  React.useEffect(() => {

    // fetch cryptocurrency data (function declaration)
    async function fetchCryptoData(token) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
        fetchOptionsCrypto.headers
      )
      const json = await response.json()
      setCryptoData(json)
    };

    // fetch cryptocurrency data (function invoke)
    fetchCryptoData('bitcoin,ethereum,cardano,ripple,binancecoin,solana,polkadot,dogecoin');

    //todo: stock data: financialmodelingprep ... fmp

  }, []); // to fetch just once

  // i can add new global state in the context which will be -1 or +1 and a button to change the state,
  // then it is possible to add a listener here in useEffect so that i can have refresh button

  // todo: ad locale button (is it necessary though?)
  // const [locale, setLocale] = React.useState('en')
  // function toggleLocale () {
  //   if (locale === 'en') {setLocale('pl')} else {setLocale('en')}
  // }

  // todo: add navbar with mobile and dekstop version with states
  const [navbarState, setNavbarState] = React.useState('desktop')

  // current page global state
  const [page, setPage] = React.useState('landing-page')

  // useMemo to store all the global variables
  const value = React.useMemo(() => ({
    // locale,
    // toggleLocale,
    navbarState,
    setNavbarState,
    page,
    setPage,
    cryptoData,
  }), [
    // locale, 
    navbarState, 
    page])

  return (
    <ContextProvider.Provider value={value}>
      <ContentWrapper />
    </ContextProvider.Provider>
  );
}

export default App;
