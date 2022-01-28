import React from 'react'
import ContextProvider from './ContextProvider'
import { motion } from 'framer-motion'
import { pageAnimation } from '../Functions/framerVariants'

const regNumber = /(\d|\.|,){1,}/
const regValidNumber = /^-?(0|[1-9]\d*)((\.|,)\d+)?$/

export default function AddAssetModal() {
    // React Refs to get input field values when submitting
    const inputName = React.useRef(null)
    const inputVolume = React.useRef(null)
    const inputPrice = React.useRef(null)
    const inputTypeC = React.useRef(null)
    const inputTypeS = React.useRef(null)

    // Crypto coin list
    const {
        cryptosList,
        stocksList,
        setPage,
        personalAssets,
        setPersonalAssets,
    } = React.useContext(ContextProvider)
    // it looks like that:
    // 0: [array]
    // id: "01coin"
    // name: "01coin"
    // symbol: "zoc"

    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [volume, setVolume] = React.useState()
    const [isError1visible, setIsError1visible] = React.useState('none')
    const [isError2visible, setIsError2visible] = React.useState('none')
    const [isError3visible, setIsError3visible] = React.useState('none')

    function submitForm(e) {
        // pattern matching to ensure proper data
        if (name === undefined) {
            setIsError1visible('block')
            console.log('name bad')
            return
        } else {
            setIsError1visible('none')
        }
        if (!regValidNumber.test(price)) {
            setIsError2visible('block')
            console.log('price bad')
            return
        } else {
            setIsError2visible('none')
        }
        if (!regValidNumber.test(volume)) {
            setIsError3visible('block')
            console.log('volume bad')
            return
        } else {
            setIsError3visible('none')
        }

        // Here I am creating new object from the inputs
        const assettype =
            inputTypeC.current.checked === true ? 'crypto' : 'stock'
        const asset = {
            name: inputName.current.value,
            type: assettype,
            symbol: getSymbol(assettype, inputName.current.value),
            prices: [
                {
                    price: inputPrice.current.value,
                    volume: inputVolume.current.value,
                },
            ],
        }
        // Store new asset in react state with prev assets
        if (personalAssets === undefined) {
            setPersonalAssets([asset])
        } else {
            setPersonalAssets([...personalAssets, asset])
        }
        // Now I need to clear all the inputs
        inputName.current.value = ''
        inputVolume.current.value = ''
        inputPrice.current.value = ''
        // And returning to 'safe' page
        setTimeout(() => setPage('safe'), 5500)
    }

    function getSymbol(type, name) {
        if (type === 'crypto') {
            // I am filtering whole crypto list to create an array with a proper name
            const obj = cryptosList.filter((item) => {
                return name === item.name
            })
            // returning its symbol
            return obj[0].symbol
        }
        if (type === 'stock') {
            const obj = stocksList.filter((item) => {
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

    return (
        <motion.div
            className='page add-asset-modal'
            initial={pageAnimation.hidden}
            animate={pageAnimation.visible}
            exit={pageAnimation.exited}
            transition={pageAnimation.transition}>
            <h1>Add new equity</h1>
            <form>
                <div>
                    <p>Choose your equity type:</p>
                    <div className='form__radio-container'>
                        <input
                            type='radio'
                            name='assettype'
                            id='radio-crypto'
                            value='Cryptocurrency'
                            ref={inputTypeC}
                            required
                            checked
                        />
                        <label for='radio-crypto'>Cryptocurrency</label>
                    </div>

                    <div className='form__radio-container'>
                        <input
                            type='radio'
                            name='assettype'
                            id='radio-stock'
                            value='Stock'
                            ref={inputTypeS}
                            required
                        />
                        <label for='radio-stock'>Stock</label>
                    </div>
                </div>

                <div>
                    <label id='form__list-label' for='form__list-input'>
                        {`Find your asset in the list below:`}
                    </label>
                    <br />
                    <input
                        className='form__input'
                        id='form__list-input'
                        list='cryptoList'
                        name='name'
                        type='list'
                        ref={inputName}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <datalist id='cryptoList'>
                        {cryptosList.map((item) => {
                            return <option value={item.name} />
                        })}
                    </datalist>
                    <p
                        className='form__error'
                        style={{ '--display': isError1visible }}>
                        You need to choose an equity
                        <br />
                        from the list above.
                    </p>
                </div>

                <div>
                    <label for='form__price-input' id='form__price-label'>
                        Price
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='value'
                        id='form__price-input'
                        ref={inputPrice}
                        required
                        autoComplete='off'
                        value={price}
                        onChange={(e) =>
                            setPrice(getValidCharacters(e.target.value))
                        }
                    />
                    <p
                        className='form__error'
                        style={{ '--display': isError2visible }}>
                        You need to enter a price
                        <br />
                        that is a valid number.
                    </p>
                </div>

                <div>
                    <label for='form__vol-input' id='form__vol-label'>
                        Volume
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='text'
                        id='form__vol-input'
                        ref={inputVolume}
                        required
                        autoComplete='off'
                        onChange={(e) =>
                            setVolume(getValidCharacters(e.target.value))
                        }
                    />
                    <p
                        className='form__error'
                        style={{ '--display': isError3visible }}>
                        You need to specify how many <br />
                        coins/shares you have bought.
                    </p>
                </div>
            </form>
            <button onClick={() => submitForm()} className='form__submit'>
                Submit
            </button>
        </motion.div>
    )
}
