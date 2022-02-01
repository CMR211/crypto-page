import axios from 'axios'
export default function fetchStocks(stocks, callbackFn) {
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            interval: '5min',
            function: 'GLOBAL_QUOTE',
            symbol: 'GME',
            // symbol: stocks.join(','),
            datatype: 'json',
            output_size: 'compact',
        },
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': '044f218bf5msh695d9c96153799bp1c58eejsn7e16c29df7a0'
        },
    }

    axios
        .request(options)
        .then(function (response) {
            callbackFn(response)
        })
        .catch(function (error) {
            console.error(error)
        })
}
