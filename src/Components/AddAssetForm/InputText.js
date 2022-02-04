import React from 'react'

export default function InputText() {
    return (
        <input
            className='form__input'
            id='form__list-input'
            list={formData.assetType === 'stock' ? 'stockList' : 'cryptoList'}
            name='assetName'
            type='list'
            required
            value={formData.assetName || ''}
            onChange={handleChange}
        />
    )
}
