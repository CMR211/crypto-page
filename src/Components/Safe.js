import React from 'react'
import ContextProvider from './ContextProvider'
import AssetCard from './AssetCard'
import { pageAnimation } from '../Functions/framerVariants'
import { motion } from 'framer-motion'

export default function Safe() {
    const { setPage, personalAssets } = React.useContext(ContextProvider)

    const mappedAssets = personalAssets.map((asset, index) => {
        return <AssetCard asset={asset} key={'asset' + index} />
    })

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
                    {mappedAssets}
                    {personalAssets.length < 8 ? AddAsset() : ''}
                </div>
            </motion.div>
        </>
    )
}
