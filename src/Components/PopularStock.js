import React from 'react'
import ContextProvider from './ContextProvider'
import StockCard from './StockCard'
import axios from 'axios';

export default function PopularStock() {

  // ------------------------------------------------
  // Timeout to wait 300ms before rendering component
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 300)
    return () => clearTimeout(timeout)
  }, [show])
  // ------------------------------------------------

  // stock data state
  const [stockData, setStockData] = React.useState([]);

  const API_KEY = '26bdfe617ad296852470853b20d6b6ef'
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
    const json = await response.json()
    setStockData(stockData => [...stockData, json])
    console.log(stockData);
  };



  // useEffect data fetch
  React.useEffect(() => {

    // fetch stocks data (function invoke)
    STOCKS.forEach(stock => fetchStocksData(stock))


  }, []); // to fetch just once

  if (!show) return (
    <p>Loading...</p>
  )
  return (
    <div className='page popular'>

      <h1>Most popular stocks</h1>

      <div className='popular__container'>
        {STOCKS.sort().map((key, index) => { return (
          <StockCard token={key} key={'popular-stock-' + index} />
        )})}
      </div>
      
    </div>
  )
}
