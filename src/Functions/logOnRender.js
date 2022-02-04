export default function logOnRender(app) {
    const dateNow = new Date()
    function cleanFormat(value) {
        if (value < 10) return '0' + value
        return value
    }
    const timestamp =
        cleanFormat(dateNow.getHours()) +
        ':' +
        cleanFormat(dateNow.getMinutes()) +
        ':' +
        cleanFormat(dateNow.getSeconds())
    console.log('%c[R] Rendering ' + app + ': ' + timestamp, 'color: gray')
}
