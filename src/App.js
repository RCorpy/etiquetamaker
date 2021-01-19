import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'

function App() {

  const [orders, setOrders] =useState([])

  useEffect(() => {
    async function getJSON(){
      const shopifyJSON = await fetch(`http://localhost:8081/`).then(res=>res.json())
      const orders = shopifyJSON.orders
      const ordersLenght = orders.length
      console.log("orders", orders)
      if(ordersLenght<8){
        for(let i=0; i<8-ordersLenght; i++){
          orders.push({
            line_items:[{quantity:0}],
            billing_address:{
              address1:"",
              address2:"",
              city:"",
              province:"",
              country:"",
              zip:"",
              first_name:"",
              last_name:""
            }
          })
        }
      }
      setOrders(shopifyJSON.orders)
      console.log("shopifyJSON", shopifyJSON)
    }
  getJSON()
  }, [])
  return (
    <div className="dina4">
      {orders.map(element=>(
        <Etiqueta order={element} />
      ))}
      
    </div>
  );
}

export default App;
