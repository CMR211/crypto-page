export default function saveToLS(object) {
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
