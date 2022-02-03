import React from 'react'
import ContentWrapper from './Components/ContentWrapper.js'
import './main.css'

// -----------------------------------------------------------
function App() {
    const time = new Date
    const timeNow = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    console.log('%c[R] Rendering App: ' + timeNow, 'color: gray')

    // Render
    return (
        <>
            <ContentWrapper />
        </>
    )
}

export default App
