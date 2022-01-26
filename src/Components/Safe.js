import React from 'react'
import ContextProvider from './ContextProvider'
import AssetCard from './AssetCard'
import { pageAnimation } from '../Functions/framerVariants'
import { motion } from 'framer-motion'

export default function Safe() {
    const testAsset = {
        type: 'crypto',
        symbol: 'eth',
        name: 'ethereum',
        prices: [
            { volume: 0.00885302, price: 2863.5244 },
            { volume: 0.0638755, price: 2679.1694 },
            { volume: 0.03559948, price: 8216.4137 / 3.8214 },
            { volume: 0.03183186, price: 2902.1679 },
        ],
    }

    const { setPage, personalCrypto } =
        React.useContext(ContextProvider)
    const [assets, setAssets] = React.useState([])

    React.useEffect(() => {
        const array = []
        setAssets([])
        for (let i = 0; i < localStorage.length; i++) {
            array.push(localStorage.key(i))
        }
        array.forEach((item) => {
            const obj = JSON.parse(localStorage.getItem(item))
            setAssets((prevAssets) => [...prevAssets, obj])
        })
    }, [localStorage])

    const mappedAssets = assets.map((asset, index) => {
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
                    {assets.length < 8 ? AddAsset() : ''}
                </div>
            </motion.div>
        </>
    )
}
