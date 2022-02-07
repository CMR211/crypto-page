import React from 'react'
import { PageProvider } from '../ContextProvider'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../Functions/framerVariants'
import { v4 as uuidv4 } from 'uuid'
import logOnRender from '../../Functions/logOnRender'

// importing stocks and cryptos list
import cryptoList from '../../JSON/cryptos100.json'
import stockList from '../../JSON/stocksNYSE.json'
import InputRadio from '../AddAssetForm/InputRadio'

function getStockNames() {
    const RV = []
    stockList.forEach((el) => RV.push(el.name))
    return RV
}

function getCryptoNames() {
    const RV = []
    cryptoList.forEach((el) => RV.push(el.name))
    return RV
}

const regNumber = /(\d|\.|,){1,}/
const regValidNumber = /^-?(0|[1-9]\d*)((\.|,)\d+)?$/

function formReducer(state, event) {
    return {
        ...state,
        [event.name]: event.value,
    }
}

export default function AddAssetModal({
    personalAssets,
    setPersonalAssets,
    syncLS,
}) {
    logOnRender('AddAssetModal')
    const [formData, setFormData] = React.useReducer(formReducer, {
        assetType: 'crypto',
        assetName: 'Bitcoin'
    })
    const { page, setPage } = React.useContext(PageProvider)
    const cryptoNames = getCryptoNames()
    const stockNames = getStockNames()

    const [errorCount, setErrorCount] = React.useState([false, false, false])

    function submitForm(event) {
        event.preventDefault()
        const asset = {
            name: formData.assetName,
            symbol: getSymbol(formData.assetType, formData.assetName),
            prices: [
                {price: formData.assetPrice, volume: formData.assetVolume}
            ],
            type: formData.assetType,
        }
        const LS = localStorage.getItem('assets')
        console.log(LS)
        if (!LS) localStorage.setItem('assets', JSON.stringify([asset]))
        else localStorage.setItem('assets', [...LS, JSON.stringify(asset)])
    }

    function getSymbol(type, name) {
        console.log(stockList)
        if (type === 'crypto') {
            // I am filtering whole crypto list to create an array with a proper name
            const obj = cryptoList.filter((item) => {
                return name === item.name
            })
            // returning its symbol
            return obj[0].symbol
        }
        if (type === 'stock') {
            const obj = stockList.filter((item) => {
                return name === item.name
            })
            // returning its symbol
            return obj[0].symbol
        }
    }

    function getValidCharacters(input) {
        const filtered = input
            .split('')
            .filter((character) => {
                return regNumber.test(character)
            })
            .join('')
        console.log(filtered)
        return filtered
    }

    function handleChange(event) {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        })
    }

    function handleRadio(val) {
        setFormData({
            name: 'assetType',
            value: val,
        })
    }

    return (
        <div
            className='page add-asset-modal'
            initial={pageAnimation.hidden}
            animate={pageAnimation.visible}
            exit={pageAnimation.exited}
            transition={pageAnimation.transition}>
            <h1>Add new equity</h1>
            <form>
                <fieldset>
                    <legend>Choose your equity type:</legend>
                    <InputRadio
                        data={{
                            name: 'assetType',
                            type: 'crypto',
                            checked: formData.assetType === 'crypto',
                            label: 'Cryptocurrency',
                        }}
                        functions={{ handleRadio }}
                    />
                    <InputRadio
                        data={{
                            name: 'assetType',
                            type: 'stock',
                            checked: formData.assetType === 'stock',
                            label: 'Stock',
                        }}
                        functions={{ handleRadio }}
                    />
                </fieldset>

                <div>
                    <label id='form__list-label' htmlFor='form__list-input'>
                        {`Find your asset in the list below:`}
                    </label>
                    <br />
                    <select
                        className='form__input'
                        id='form__list-input'
                        name='assetName'
                        type='list'
                        required
                        value={formData.assetName || ''}
                        onChange={handleChange}>
                        {formData.assetType === 'crypto' &&
                            cryptoNames.map((item) => <option>{item}</option>)}
                        {formData.assetType === 'stock' &&
                            stockNames.map((item) => <option>{item}</option>)}
                    </select>
                    <p
                        className='form__error'
                        style={{
                            '--display':
                                errorCount[0] === true ? 'block' : 'none',
                        }}>
                        You need to choose an equity
                        <br />
                        from the list above.
                    </p>
                </div>

                <div>
                    <label htmlFor='form__price-input' id='form__price-label'>
                        Price
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='number'
                        pattern='^\d*(\.\d{0,8})?$'
                        id='form__price-input'
                        required
                        name='assetPrice'
                        autoComplete='off'
                        value={formData.assetPrice || ''}
                        onChange={handleChange}
                    />
                    <p
                        className='form__error'
                        style={{
                            '--display':
                                errorCount[1] === true ? 'block' : 'none',
                        }}>
                        You need to enter a price
                        <br />
                        that is a valid number.
                    </p>
                </div>

                <div>
                    <label htmlFor='form__vol-input' id='form__vol-label'>
                        Volume
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='number'
                        id='form__vol-input'
                        required
                        autoComplete='off'
                        name='assetVolume'
                        value={formData.assetVolume}
                        onChange={handleChange}
                    />
                    <p
                        className='form__error'
                        style={{
                            '--display':
                                errorCount[2] === true ? 'block' : 'none',
                        }}>
                        You need to specify how many <br />
                        coins/shares you have bought.
                    </p>
                </div>
            </form>
            <button onClick={submitForm} className='form__submit'>
                Submit
            </button>
        </div>
    )
}
