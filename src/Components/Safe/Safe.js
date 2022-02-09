import React from 'react'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../Functions/framerVariants'
import AssetCard from './AssetCard'
import logOnRender from '../../Functions/logOnRender'
import fetchSafe from '../../Functions/fetchSafe'

export default function Safe({
    personalAssets,
    setPersonalAssets,
    setPage,
    syncLS,
    symbolsToFetch,
}) {
    logOnRender('LandingPage')
    const [isLoading, setIsLoading] = React.useState(true)
    const [assetsPrices, setAssetsPrices] = React.useState()

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

    function getPersonalAssets() {
        if (!personalAssets) return null
        if (personalAssets) {
            const mappedAssets = personalAssets.map((asset, index) => {
                return (
                    <AssetCard
                        asset={asset}
                        key={asset.symbol}
                        index={index}
                        syncLC={syncLS}
                        assetsPrices={assetsPrices}
                        personalAssets={personalAssets}
                        setPersonalAssets={setPersonalAssets}
                    />
                )
            })
            return mappedAssets
        }
    }

    React.useEffect(() => {
        if (assetsPrices || !symbolsToFetch) {
            setIsLoading(false)
            return
        }
        fetchSafe(symbolsToFetch, setAssetsPrices, setIsLoading)
    }, [])

    const LoadedComponent = () => {
        return (
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
                    {personalAssets && personalAssets.length < 8
                        ? AddAsset()
                        : ''}
                    {!personalAssets ? AddAsset() : ''}
                </div>
            </motion.div>
        )
    }

    const UnloadedComponent = () => {
        return (
            <motion.div
                className='page safe'
                initial={pageAnimation.hidden}
                animate={pageAnimation.visible}
                exit={pageAnimation.exited}
                transition={pageAnimation.transition}>
                <h1>Personal assets</h1>
                <p>Personal Assets are being loaded...</p>
            </motion.div>
        )
    }

    if (isLoading) return <UnloadedComponent />
    if (!isLoading) return <LoadedComponent />
}
