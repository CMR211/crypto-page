import React from 'react'
import ContextProvider from './ContextProvider'

export default function Safe() {

    const {stockData, cryptoData} = React.useContext(ContextProvider)

    return <div className='page safe'></div>
}
