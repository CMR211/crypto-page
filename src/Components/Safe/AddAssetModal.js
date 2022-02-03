import React from 'react'
import { PageProvider}  from '../ContextProvider'
import { motion } from 'framer-motion'
import { pageAnimation } from '../../Functions/framerVariants'
import { v4 as uuidv4 } from 'uuid'

const regNumber = /(\d|\.|,){1,}/
const regValidNumber = /^-?(0|[1-9]\d*)((\.|,)\d+)?$/

export default function AddAssetModal({allCryptosList, allStocksList, personalAssets, setPersonalAssets, syncLS}) {

    console.log('%cAll cryptos list form AddAssetModal component', 'color:green; font-weight: bold')
    console.dir(allCryptosList)
    const { page, setPage } = React.useContext(PageProvider)

    const [name, setName] = React.useState()
    const [price, setPrice] = React.useState()
    const [volume, setVolume] = React.useState()
    const [type, setType] = React.useState('crypto')
    const [isError1visible, setIsError1visible] = React.useState('none')
    const [isError2visible, setIsError2visible] = React.useState('none')
    const [isError3visible, setIsError3visible] = React.useState('none')

    function submitForm(e) {
        // pattern matching to ensure proper data
        if (!name) {
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
        
        const asset = {
            name,
            type,
            symbol: getSymbol(type, name),
            prices: [
                {
                    price: price,
                    volume: volume,
                },
            ],
        }
        // Store new asset in react state with prev assets
        if (!personalAssets) {
            setPersonalAssets([asset])
        } else {
            setPersonalAssets(personalAssets => [...personalAssets, asset])
        }
        syncLS(personalAssets)
        // Now I need to clear all the inputs
        setName('')
        setVolume('')
        setPrice('')
        // And returning to 'safe' page
        setTimeout(() => setPage('safe'), 350)
    }

    function getSymbol(type, name) {
        if (type === 'crypto') {
            // I am filtering whole crypto list to create an array with a proper name
            const obj = allCryptosList?.filter((item) => {
                return name === item.name
            })
            // returning its symbol
            return obj[0].symbol
        }
        if (type === 'stock') {
            const obj = allStocksList?.filter((item) => {
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

    function handleChange (e) {
        const { value } = e.target;
        setType(value)}

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
                            value='crypto'
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor='radio-crypto'>Cryptocurrency</label>
                    </div>

                    <div className='form__radio-container'>
                        <input
                            type='radio'
                            name='assettype'
                            id='radio-stock'
                            value='stock'
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor='radio-stock'>Stock</label>
                    </div>
                </div>

                <div>
                    <label id='form__list-label' htmlFor='form__list-input'>
                        {`Find your asset in the list below:`}
                    </label>
                    <br />
                    <input
                        className='form__input'
                        id='form__list-input'
                        list={`${type}List`}
                        name='name'
                        type='list'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <datalist id='cryptoList'>
                        {allCryptosList?.map((item) => {
                            return <option key={uuidv4()} value={item.name} />
                        })}
                    </datalist>
                    <datalist id='stockList'>
                        {allStocksList?.map((item) => {
                            return <option key={uuidv4()} value={item.name} />
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
                    <label htmlFor='form__price-input' id='form__price-label'>
                        Price
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='value'
                        id='form__price-input'
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
                    <label htmlFor='form__vol-input' id='form__vol-label'>
                        Volume
                    </label>
                    <br />
                    <input
                        className='form__input'
                        type='text'
                        id='form__vol-input'
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
            <button onClick={submitForm} className='form__submit'>
                Submit
            </button>
        </motion.div>
    )
}
