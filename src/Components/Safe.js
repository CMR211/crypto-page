import React from 'react'
import { PageProvider, PersonalAssetsProvider } from './ContextProvider'
import AssetCard from './AssetCard'
import { pageAnimation } from '../Functions/framerVariants'
import { motion } from 'framer-motion'
import fetchCryptos from '../Functions/fetchCryptos'
import fetchStocks from '../Functions/fetchStocks'

export default function Safe() {
    console.log('Rendering Safe')

    const { personalAssets, personalCryptos, personalStocks } =
        React.useContext(PersonalAssetsProvider)
    const { setPage } = React.useContext(PageProvider)

    // React.useState(() => {
    //     // Update localStorage whenever personalAssets change
    //     console.log('Update localStorage whenever personalAssets change')
    //     localStorage.setItem('assets', JSON.stringify(personalAssets))
    //     // Fetching personal assets current prices
    //     console.log('Fetching personal assets current prices')
    //     if (personalAssets === undefined) return
    //     const personalStocks = []
    //     const personalCryptos = []
    //     console.table(personalAssets)
    //     personalAssets.forEach((item) => {
    //         if (item.type === 'stock') personalStocks.push(item.name)
    //         if (item.type === 'crypto') personalCryptos.push(item.name)
    //     })
    //     console.log('personalStocks:')
    //     console.log(personalStocks)
    //     console.log('personalCryptos:')
    //     console.log(personalCryptos)
    //     if (personalStocks.length > 0) {
    //         fetchStocks(personalStocks, setPersonalStocksPrices)
    //     }
    //     if (personalCryptos.length > 0) {
    //         fetchCryptos(personalCryptos, setPersonalCryptosPrices)
    //     }
    // }, [personalAssets])

    function getPersonalAssets() {
        if (personalAssets === undefined) return
        const mappedAssets = personalAssets.map((asset, index) => {
            return (
                <AssetCard
                    asset={asset}
                    key={'asset' + index}
                    personalCryptos={personalCryptos}
                    personalStocks={personalStocks}
                    index={index}
                />
            )
        })
        return mappedAssets
    }

    function AddAsset() {
        return (
            <button
                className='popular-card safe__add-asset'
                onClick={() => setPage('add')}>
                <span>Add new asset</span>
                <i className='fas fa-plus-circle'></i>
            </button>
        )
    }

    return (
        <>
            {/* <AddAssetModal /> */}
            <motion.div
                className='page safe'
                initial={pageAnimation.hidden}
                animate={pageAnimation.visible}
                exit={pageAnimation.exited}
                transition={pageAnimation.transition}>
                <h1>Personal assets</h1>
                <p>
                    Click to add your asset (stock or crypto). Specify the price
                    at which it was bought and we will show your potential
                    profit or loss. You can have up to 8 assets saved.
                </p>
                <div className='safe__container'>
                    {getPersonalAssets()}
                    {personalAssets === undefined || personalAssets.length < 8
                        ? AddAsset()
                        : ''}
                </div>
            </motion.div>
        </>
    )
}
