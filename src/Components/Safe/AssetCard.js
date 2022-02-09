import React from 'react'
import { PersonalAssetsProvider } from '../ContextProvider'
import logOnRender from '../../Functions/logOnRender'

export default function AssetCard({
    asset,
    index,
    assetsPrices,
    setPersonalAssets,
    personalAssets,
}) {
    logOnRender('AssetCard')
    const { name, type, symbol, prices } = asset
    // example asset:
    // name: "Bitcoin",
    // prices: [ price: "1800",
    //           volume: "1" ]
    // symbol: "BTC",
    // type: "crypto",

    function totalVolume() {
        return prices.reduce((prev, curr) => prev + parseFloat(curr.volume), 0)
    }

    function averagePrice() {
        return (
            Math.round(
                (prices.reduce(
                    (prev, curr) => prev + curr.price * curr.volume,
                    0
                ) /
                    totalVolume()) *
                    100
            ) / 100
        )
    }

    function currentAsset() {
        if (type === 'crypto')
            return assetsPrices.filter((i) => i.symbol === symbol + '-USD')[0]
        if (type === 'stock')
            return assetsPrices.filter((i) => i.symbol === symbol)[0]
    }

    function getCurrentPrice() {
        return currentAsset().price
    }

    const profit =
        Math.round(totalVolume() * (getCurrentPrice() - averagePrice()) * 100) /
        100

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
        return 'hsl(' + (360 / 8) * index + 'deg 100% 79%)'
    }

    function deleteAsset() {
        console.log('CLICKED')
        const newPersonalAssets = personalAssets.filter(
            (i) => i.symbol !== symbol
        )
        setPersonalAssets(newPersonalAssets)
        localStorage.setItem('assets', JSON.stringify(newPersonalAssets))
    }

    return (
        <div className='popular-card__link'>
            <div
                className={`asset`}
                // onClick={(event) => (window.location.href = gotoLink())}
                style={{ '--color': getRandomColor() }}>
                <div className='asset__circle'>{symbol.toUpperCase()}</div>

                <p className='asset__title'>{name.toUpperCase()}</p>

                <p className='asset__prices asset__have'>
                    <span className='asset__prices__text'>
                        {`${totalVolume().toLocaleString()} ${symbol.toUpperCase()} @ ${averagePrice().toLocaleString()}`}
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
                        {Math.round(
                            ((getCurrentPrice() - averagePrice()) /
                                averagePrice()) *
                                100
                        )}
                    </span>

                    <span className={`asset__prices__usd ${getChangeColor()}`}>
                        %
                    </span>
                </p>

                <button className='asset__btn-del' onClick={deleteAsset}>
                    <i className='fa-solid fa-trash-can'></i>
                </button>
            </div>{' '}
            {/* <div className={`asset`} > */}
        </div>
    )
}
