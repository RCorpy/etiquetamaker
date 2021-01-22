import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'
import Menu from './Menu.js'

function App() {

  const [orders, setOrders] =useState([{id:1, line_items:[{}], billing_address:{zip:"", province:"", country:"", city:""}}])
  const [orderIDs, setOrderIDs] = useState([{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0}])


  const fulfillOrders= async ()=>{
    await fetch(`http://localhost:8081/fullfillorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: orderIDs
      })
    }).then(res=>res.json()).then(res=> console.log(res))
  }


  const getJSON = async function(){
    console.log("getting JSON")
    await fetch(`http://localhost:8081/`).then(res=>res.json()).then(shopify=>{

      const newOrders = shopify.orders
      const newOrdersLenght = newOrders.length
      if(newOrdersLenght<8){
        for(let i=0; i<8-newOrdersLenght; i++){
          newOrders.push({
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
      if(orders[0].id!==newOrders[0].id){
        setOrderIDs(orders.map(order=>({id: order.id, qty: order.line_items[0].quantity})))
        console.log("orders", orders, newOrders)
        setOrders(newOrders)
      }
      else{
        alert("no changes on the orders yet")
      }


    })

  }

  useEffect(() => {
    getJSON()
  }, [])

  return (
    <div className="fullapp">
      <div id="printcontent">
        <div className="dina4">
          {orders.map(element=>(
            <Etiqueta order={element} />
          ))}
        </div>
      </div>
      <Menu fulfillOrders={fulfillOrders} getJSON={getJSON}/>
    </div>

  );
}

export default App;
