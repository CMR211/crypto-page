import React from 'react'
import ContentWrapper from './Components/ContentWrapper.js'
import './main.css'
import logOnRender from './Functions/logOnRender'

// -----------------------------------------------------------
function App() {
    logOnRender('App')

    // Render
    return (
        <>
            <ContentWrapper />
        </>
    )
}

export default App
