export default function isStorageAvailable(type) {
    // checking if there is a storage available
    // type either 'local-storage' or 'session-storage'
    try {
        var storage = window[type],
            x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return false
    }
}
