import React from 'react'
import ContextProvider from './ContextProvider'

export default function Popular() {

  const {data} = React.useContext(ContextProvider)

  return (
    <div className='page popular'>
      <h1>Most popular cryptocurrency</h1>
      
    </div>
  )
}
