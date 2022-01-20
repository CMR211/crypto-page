import React from 'react'
import ContextProvider from './ContextProvider'
import StockCard from './StockCard'
import axios from 'axios';

export default function PopularStock() {

  let errorMessage; // err handling

  // ------------------------------------------------
  // Timeout to wait 300ms before rendering component
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
      console.log(stockData)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [show])
  // ------------------------------------------------

  // stock data state
  const [stockData, setStockData] = React.useState([]);

  const API_KEY = '26bdfe617ad296852470853b20d6b6ef'
  // const STOCKS = ['GME','TSLA']
  const STOCKS = ['GME','TSLA','PLTR','INTC','NIO','AAPL','AMC','MSFT']
  const fetchOptionsStock = {
    // url: `https://financialmodelingprep.com/api/v3/quote/${STOCK}?apikey=${API_KEY}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'json/text',
      'Content-type': 'json/text',
    }
  }
  // fetch stocks data (function declaration)
  async function fetchStocksData(stock) {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${stock}?apikey=${API_KEY}`,
      fetchOptionsStock.headers
    )
    if (response.status === 200) {
      const json = await response.json()
      setStockData(stockData => [...stockData, ...json])
      console.log(json)
      console.log(stockData);
    } else {
      errorMessage = response.status
      setShow('error')
    }
  };

  // useEffect data fetch
  React.useEffect(() => {

    // fetch stocks data (function invoke)
    STOCKS.forEach((stock, index) => setTimeout(() => fetchStocksData(stock),  100 * index ))

    console.log(stockData)
  }, []); // to fetch just once


  // Render:

  if (!show) return (
    <div className='page'>
      <p>Loading...</p>
    </div>
  )

  if (show === 'error') return (
    <div className='page'>
      <p>There was an error fetching data. Please refresh the page and try again.</p>
      <p>Response error: {errorMessage}.</p>
    </div>
  )

  return (
    <div className='page popular'>

      <h1>Most popular stocks</h1>

      <div className='popular__container'>
        {stockData.map((object, index) => { return (
          <StockCard stock={object} key={'popular-stock-' + index} />
        )})}
      </div>
      
    </div>
  )
}
