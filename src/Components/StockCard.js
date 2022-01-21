import React from 'react'
import ContextProvider from './ContextProvider'

export default function StockCard({ stock }) {
    const { name, price, change, symbol } = stock

    // round daily change to #.## format
    const changeRounded = Math.round(change * 100) / 100

    // when daily change is negative its color is red, otherwise green
    function getChangeColor() {
        if (changeRounded <= 0) return 'popular-card__change-red'
        if (changeRounded > 0) return 'popular-card__change-green'
    }

    // when clicking on a coin container I want to see detailed info, so it redirects to coinmarketcap
    function gotoLink() {
        const url = 'https://www.marketwatch.com/investing/stock/'
        return url + symbol
    }

    return (
        <a className='popular-card__link' href={gotoLink()}>
            <div
                className={`popular-card popular-card-${symbol}`}
                onClick={(event) => (window.location.href = gotoLink())}>
                <img
                    className='popular-card__icon'
                    src={`/assets/${symbol}.png`}
                    alt={`${symbol}-icon`}
                />

                <p className='popular-card__title--stock'>
                    {symbol}
                    <br />
                    <span className='popular-card__title--stockname'>
                        {name}
                    </span>
                </p>

                <p className='popular-card__price'>
                    {price.toLocaleString()}
                    <span className='popular-card__price__usd'>USD</span>
                </p>

                <p
                    className={
                        'popular-card__change ' + getChangeColor()
                    }>{`(${changeRounded}%)`}</p>
            </div>
        </a>
    )
}
