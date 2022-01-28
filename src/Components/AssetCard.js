import React from 'react'
import ContextProvider from './ContextProvider'

export default function AssetCard({ asset }) {
    const { personalStocksPrices, personalCryptosPrices } =
        React.useContext(ContextProvider)

    const { name, type, symbol, prices } = asset

    const totalVolume = prices.reduce((prev, curr) => prev + curr.volume, 0)

    const avgPrice =
        Math.round(
            (prices.reduce((prev, curr) => prev + curr.price * curr.volume, 0) /
                totalVolume) *
                100
        ) / 100

    function getCurrentPrice() {
        return 2000
        // console.table(personalCryptosPrices)
        if (type === 'crypto') {
            const t = personalCryptosPrices.filter(
                (item) => item.name === name
            )[0].usd
            return t
        }
        if (type === 'stock') {
            const t = personalStocksPrices.filter(
                (item) => item.name === name
            )[0].usd
            return t
        }
    }

    const profit =
        Math.round(totalVolume * (getCurrentPrice() - avgPrice) * 100) / 100

    // when clicking on a coin container I want to see detailed info, so it redirects to coinmarketcap
    function gotoLink() {
        let url
        if (type === 'stock') {
            url = 'https://www.marketwatch.com/investing/stock/'
            return url + symbol
        }
    }

    function getChangeColor() {
        if (profit <= 0) return 'text-red'
        if (profit > 0) return 'text-green'
    }

    return (
        <a className='popular-card__link' href={gotoLink()}>
            <div
                className={`asset`}
                onClick={(event) => (window.location.href = gotoLink())}>
                <div className='asset__circle'>{symbol.toUpperCase()}</div>

                <p className='asset__title'>{name.toUpperCase()}</p>

                <p className='asset__prices asset__have'>
                    <span className='asset__prices__text'>
                        {`${totalVolume.toLocaleString()} ${symbol.toUpperCase()} @ ${avgPrice.toLocaleString()}`}
                    </span>
                    <span className='asset__prices__avg-price'>
                        {/* {personal[name].usd.toLocaleString()} */}asd
                    </span>
                    <span className='asset__prices__usd'>USD</span>
                </p>

                <p className='asset__prices asset__current'>
                    <span className='asset__prices__text'>Current price: </span>
                    <span className='asset__prices__avg-price'>
                        {getCurrentPrice().toLocaleString()}
                    </span>
                    <span className='asset__prices__usd'>USD</span>
                </p>

                <p className='asset__prices asset__change'>
                    <span className={`asset__prices__text ${getChangeColor()}`}>
                        {profit < 0 ? '' : '+'}
                    </span>
                    <span
                        className={`asset__prices__avg-price ${getChangeColor()}`}>
                        {profit.toLocaleString()}
                    </span>
                    <span className={`asset__prices__usd ${getChangeColor()}`}>
                        USD
                    </span>
                </p>
            </div>
        </a>
    )
}
