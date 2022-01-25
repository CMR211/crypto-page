import React from 'react'
import ContextProvider from './ContextProvider'
import AssetCard from './AssetCard'
import AddAssetModal from './AddAssetModal'

function AddAsset() {
    return (
        <button className='popular-card safe__add-asset'>
            <span>Add new asset</span>
            <i className='fas fa-plus-circle'></i>
        </button>
    )
}

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

    const { stockData, cryptoData } = React.useContext(ContextProvider)
    const [assets, setAssets] = React.useState([testAsset])
    const [showModal, setShowModal] = React.useState(true)

    const mappedAssets = assets.map((asset, index) => {
        return <AssetCard asset={asset} key={'asset' + index} />
    })

    return (
        <>
        <AddAssetModal />
            <div className='page safe'>
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
            </div>
        </>
    )
}