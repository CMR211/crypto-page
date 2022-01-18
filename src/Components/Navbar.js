import React from 'react'
import ContextProvider from './ContextProvider'

const navbarItems = [
  {
    en: 'Popular crypto',
    pl: 'Popularne crypto',
  },
  {
    en: 'Portfolio',
    pl: 'Portfolio',
  },
  {
    en: 'Set your portfolio',
    pl: 'Ustaw swoje portfolio',
  }
]

export default function Navbar() {

  const {locale, toggleLocale, navbarState, setNavbarState} = React.useContext(ContextProvider)

  function toggleNavbarState () {
    if (navbarState === 'desktop') setNavbarState('mobile');
    if (navbarState === 'mobile') setNavbarState('desktop') 
  }


  return (
    <div className={`nav nav__${navbarState}`} >

            {navbarItems.map((item, index) => {return(
              <button 
              key={`navbarItems-${index}`} 
              className={`nav__item nav__item${index+1}`}
              onClick={() => toggleNavbarState()}>
                {`${item[locale]}`}
              </button>
            )})}

    </div>
  )
}
