import React from 'react'

export default function AddAssetModal() {
    const [asset, setAsset] = React.useState({})
    return (
        <div className='modal'>
            <form>
                <input
                    type='radio'
                    name='assettype'
                    id='radio-crypto'
                    value='Cryptocurrency'></input>
                <label for='radio-crypto'>Cryptocurrency</label>
                <input
                    type='radio'
                    name='assettype'
                    id='radio-stock'
                    value='Stock'
                />
                <label for='radio-stock'>Stock</label>
            </form>
        </div>
    )
}
