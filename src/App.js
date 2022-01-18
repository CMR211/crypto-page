import React from 'react'

import ContentWrapper from './Components/ContentWrapper.js'
import ContextProvider from './Components/ContextProvider.js';
import './main.css'

function App() {

  const [locale, setLocale] = React.useState('en')
  function toggleLocale () {
    if (locale === 'en') {setLocale('pl')} else {setLocale('en')}
  }

  const value = React.useMemo(() => ({
    locale,
    toggleLocale
  }), [locale])

  return (
    <ContextProvider.Provider value={value}>
      <ContentWrapper />
    </ContextProvider.Provider>
  );
}

export default App;
