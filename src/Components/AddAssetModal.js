import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils'
import React from 'react'
import ContextProvider from './ContextProvider'

export default function AddAssetModal() {
    // React Refs to get input field values when submitting
    const inputName = React.useRef(null)
    const inputVolume = React.useRef(null)
    const inputPrice = React.useRef(null)
    const inputTypeC = React.useRef(null)
    const inputTypeS = React.useRef(null)

    // Crypto coin list
    const { cryptoList, setPage } = React.useContext(ContextProvider)
    // it looks like that:
    // 0: [array]
    // id: "01coin"
    // name: "01coin"
    // symbol: "zoc"

    function submitForm() {
        // Here I am creating new object from the inputs
        const asset = {
            name: inputName.current.value,
            type: inputTypeC.current.checked === true ? 'crypto' : 'stock',
            symbol: getSymbol(inputName.current.value),
            prices: [
                {
                    price: inputPrice.current.value,
                    volume: inputVolume.current.value,
                },
            ],
        }
        // Saving it to local storage
        saveToLS(asset)
        // Now I need to clear all the inputs
        inputName.current.value = ''
        inputVolume.current.value = ''
        inputPrice.current.value = ''
        // And returning to 'safe' page
        setPage('safe')
    }

    function saveToLS(object) {
        // first lets check if there is an item with this key in storage
        // the keys are assigned by crypto name
        if (localStorage[object.name] === undefined) {
            // if there is no such item I create it (it needs to be a string first)
            localStorage.setItem(object.name, JSON.stringify(object))
        } else {
            // if there is such an item, user probably wanted to add another transaction
            // so I am getting the existing object:
            const prevObject = JSON.parse(localStorage.getItem(object.name))
            // and then I am creating a new object using spread operators that contains
            // existing informations and a new price-volume pair (another transaction)
            const newObject = {
                ...prevObject,
                prices: [...prevObject.prices, object.prices[0]],
            }
            // lastly I am saving this new object to local storage
            localStorage.setItem(object.name, JSON.stringify(newObject))
        }
    }

    function getSymbol(name) {
        // I am filtering whole crypto list to create an array with a proper name
        const obj = cryptoList.filter((item) => {
            return name === item.name
        })
        // returning its symbol
        return obj[0].symbol
    }

    return (
        <div className='page '>
            <h1>Add new equity</h1>
            <form>
                <div>
                    <p>Choose your equity type:</p>
                    <input
                        type='radio'
                        name='assettype'
                        id='radio-crypto'
                        value='Cryptocurrency'
                        ref={inputTypeC}
                    />
                    <label for='radio-crypto'>Cryptocurrency</label>

                    <input
                        type='radio'
                        name='assettype'
                        id='radio-stock'
                        value='Stock'
                        ref={inputTypeS}
                    />
                    <label for='radio-stock'>Stock</label>
                </div>

                <div>
                    <label id='form__list-label' for='form__list-input'>
                        {`Find your asset in the list below:`}
                    </label>
                    <br />
                    <input
                        id='form__list-input'
                        list='cryptoList'
                        name='name'
                        type='list'
                        ref={inputName}
                    />
                    <datalist id='cryptoList'>
                        {cryptoList.map((item) => {
                            return <option value={item.name} />
                        })}
                    </datalist>
                </div>

                <br />

                <br />
                <div>
                    <label for='form__price-input' id='form__price-label'>
                        Price
                    </label>
                    <br />
                    <input
                        type='value'
                        id='form__price-input'
                        ref={inputPrice}
                    />
                </div>

                <div>
                    <label for='form__vol-input' id='form__vol-label'>
                        Volume
                    </label>
                    <br />
                    <input
                        type='value'
                        id='form__vol-input'
                        ref={inputVolume}
                    />
                </div>
            </form>
            <button className='form__submit' onClick={() => submitForm()}>
                Add
            </button>
        </div>
    )
}
