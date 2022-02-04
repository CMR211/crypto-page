import React from 'react'

export default function InputRadio({ functions, data }) {
    const { type, checked, label, name } = data
    const { handleRadio } = functions
    return (
        <div className='form__radio-container'>
            <input
                type='radio'
                name={name} //name='assetType'
                id={'radio-' + type} //id='radio-crypto'
                checked={checked} //checked={formData.assetType === 'crypto'}
                required
                onChange={() => handleRadio(type)}
            />
            <label htmlFor={'radio-' + type}>{label}</label> {/* Cryptocurrency */}
        </div>
    )
}
