import React from 'react'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js';
import './main.css'

function App() {

  const [data, setData] = React.useState();

  const fetchOptions = {
    url: 'https://api.coingecko.com/api/v3/coins/ethereum/tickers?exchange_ids=binance',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'json/text',
      'Content-type': 'json/text',
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(fetchOptions.url,  fetchOptions)
      const json = await response.json()
      setData(json)
    };
    fetchData();
    console.log(data)
  }, []);

  const [locale, setLocale] = React.useState('en')
  function toggleLocale () {
    if (locale === 'en') {setLocale('pl')} else {setLocale('en')}
  }

  const [navbarState, setNavbarState] = React.useState('desktop')
  const [page, setPage] = React.useState('landing-page')

  const value = React.useMemo(() => ({
    locale,
    toggleLocale,
    navbarState,
    setNavbarState,
    page,
    setPage,
    data
  }), [locale, navbarState, page])

  return (
    <ContextProvider.Provider value={value}>
      <ContentWrapper />
    </ContextProvider.Provider>
  );
}

export default App;
