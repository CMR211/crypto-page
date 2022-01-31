import React from 'react'
import { PageProvider } from './ContextProvider'
import { motion } from 'framer-motion'

const navbarItems = [
    ['Home', 'fas fa-home', 'landing-page'],
    ['Popular cryptos', 'fab fa-bitcoin', 'popular-crypto'],
    ['Popular stocks', 'fas fa-landmark', 'popular-stock'],
    ['Your assets', 'fas fa-wallet', 'safe'],
]

export default function Navbar() {
    const { setPage } = React.useContext(PageProvider)

    return (
        <motion.div className={`nav`} key='adszxc'>
            {navbarItems.map((item, index) => {
                return (
                    <>
                        <button
                            key={`navbarItems-${index}`}
                            className={`nav__item nav__item${index + 1}=`}
                            onClick={() => {
                                setPage(item[2])
                            }}>
                            <i
                                key={`navbarItemsI-${index}`}
                                className={item[1]}></i>
                            <span
                                key={`navbarItemsSpan-${index}`}
                                className='nav__item__text'>{`${item[0]}`}</span>
                        </button>
                    </>
                )
            })}
        </motion.div>
    )
}
