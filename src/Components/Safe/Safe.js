import React from 'react'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../Functions/framerVariants'
import AssetCard from './AssetCard'
import { v4 as uuidv4 } from 'uuid'

export default function Safe({ personalAssets, setPage, syncLS }) {
    function AddAsset() {
        return (
            <button
                key={uuidv4()}
                className='popular-card safe__add-asset'
                onClick={() => setPage('add')}>
                <span>Add new asset</span>
                <i className='fas fa-plus-circle'></i>
            </button>
        )
    }

    function getPersonalAssets() {
        if (personalAssets) {
            const mappedAssets = personalAssets.map((asset, index) => {
                return (
                    <AssetCard
                        asset={asset}
                        key={uuidv4()}
                        index={index}
                        syncLC={syncLS}
                    />
                )
            })
            return mappedAssets
        }
    }

    return (
        <motion.div
            key={uuidv4()}
            className='page safe'
            initial={pageAnimation.hidden}
            animate={pageAnimation.visible}
            exit={pageAnimation.exited}
            transition={pageAnimation.transition}>
            <h1>Personal assets</h1>
            <p>
                Click to add your asset (stock or crypto). Specify the price at
                which it was bought and we will show your potential profit or
                loss. You can have up to 8 assets saved.
            </p>
            <div className='safe__container'>
                {getPersonalAssets()}
                {personalAssets && personalAssets.length < 8 ? AddAsset() : ''}
                {!personalAssets ? AddAsset() : ''}
            </div>
        </motion.div>
    )
}
