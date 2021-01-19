import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'

function App() {

  const [orders, setOrders] =useState([])

  useEffect(() => {
    async function getJSON(){
      const shopifyJSON = await fetch(`http://localhost:8081/`).then(res=>res.json())
      setOrders(shopifyJSON.orders)
      console.log("shopifyJSON", shopifyJSON)
    }
  getJSON()
  }, [])
  return (
    <div className="App">
      {orders.map(element=>(
      <div className="dina4">
        <Etiqueta order={element} />
      </div>
      ))}
    </div>
  );
}

export default App;
