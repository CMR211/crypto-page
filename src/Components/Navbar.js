import React from 'react'
import ContextProvider from './ContextProvider'

const navbarItems = [
  ['Home', 'fas fa-home', 'landing-page'],
  ['Popular cryptos', 'fab fa-bitcoin', 'popular-crypto'],
  ['Popular stocks', 'fas fa-landmark', 'popular-stock']
]

export default function Navbar() {

  const {setPage} = React.useContext(ContextProvider)

  return (
    <div className={`nav`} >

            {navbarItems.map((item, index) => {return(
              <>
                
                <button 
                key={`navbarItems-${index}`} 
                className={`nav__item nav__item${index+1}=`}
                onClick={() => setPage(item[2])}>
                  <i className={item[1]}></i>
                  <span className='nav__item__text'>{`${item[0]}`}</span>
                </button>
              </>
              
            )})}

    </div>
  )
}
