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

  const {locale, toggleLocale} = React.useContext(ContextProvider)

  return (
    <div className='nav'>

        {navbarItems.map((item, index) => {return(
          <button 
          key={`navbarItems-${index}`} 
          className={`nav__item nav__item${index+1}`}
          onClick={() => toggleLocale()}
          >
            {`${item[locale]}`}
          </button>
        )})}

    </div>
  )
}
