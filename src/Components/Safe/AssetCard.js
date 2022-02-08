import React from 'react'
import {PersonalAssetsProvider} from '../ContextProvider'
import logOnRender from '../../Functions/logOnRender'

export default function AssetCard({ asset, index, assetPrices }) {
    logOnRender('AssetCard')


    const { name, type, symbol, prices } = asset

    const totalVolume = prices.reduce((prev, curr) => prev + parseFloat(curr.volume), 0)

    const avgPrice =
        Math.round(
            (prices.reduce((prev, curr) => prev + curr.price * curr.volume, 0) /
                totalVolume) *
                100
        ) / 100

    function getCurrentPrice() {
        if (type === 'crypto') return assetPrices.filter(i => i.symbol === symbol + '-USD')[0].regularMarketPrice
        if (type === 'stock') return assetPrices.filter(i => i.symbol === symbol)[0].regularMarketPrice
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

    function getRandomColor() {
        return 'hsl(' + 360/8*index + 'deg 100% 79%)'
    }

    return (
        <a className='popular-card__link' href={gotoLink()}>
            <div
                className={`asset`}
                onClick={(event) => (window.location.href = gotoLink())}
                style={{'--color': getRandomColor() }}>
                <div className='asset__circle'>{symbol.toUpperCase()}</div>

                <p className='asset__title'>{name.toUpperCase()}</p>

                <p className='asset__prices asset__have'>
                    <span className='asset__prices__text'>
                        {`${totalVolume.toLocaleString()} ${symbol.toUpperCase()} @ ${avgPrice.toLocaleString()}`}
                    </span>
                    <span className='asset__prices__avg-price'>
                        {/* {personal[name].usd.toLocaleString()} */}
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
                    <br />
                    <span className={`asset__prices__text ${getChangeColor()}`}>
                        {profit < 0 ? '' : '+'}
                    </span>
                    <span
                        className={`asset__prices__avg-price ${getChangeColor()}`}>
                        {Math.round((getCurrentPrice() - avgPrice)/avgPrice*100)}
                    </span>
                    <span className={`asset__prices__usd ${getChangeColor()}`}>
                        %
                    </span>

                </p>
            </div>
        </a>
    )
}
