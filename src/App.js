import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'
import Menu from './Menu.js'

function App() {

  const [orders, setOrders] =useState([{id:1, line_items:[{}], billing_address:{zip:"", province:"", country:"", city:""}}])
  const [showOrders, setShowOrders] =useState([{id:1, line_items:[{}], billing_address:{zip:"", province:"", country:"", city:""}}])
  const [orderIDs, setOrderIDs] = useState([{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0},{id:0, qty: 0}])
  
  const [startAt, setStartAt] = useState(0)

  const emptyOrder = {
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
  }

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
      if(orders[0].id!==newOrders[0].id || newOrders[0].id===0){
        setOrderIDs(newOrders.map(order=>({id: order.id, qty: order.line_items[0].quantity})))
        setOrders(newOrders)
      }
      else{
        alert("no changes on the orders yet")
      }
    }).then(()=>arrangeShowOrders())
  }

  const arrangeShowOrders= ()=>{
    const newOrders = [...orders]

    for(let j=0; j<startAt; j++){
      newOrders.unshift(emptyOrder)
    }

    const newOrdersLenght = newOrders.length

    if(newOrdersLenght<8){
      for(let i=0; i<8-newOrdersLenght; i++){
        newOrders.push(emptyOrder)
      }
    }
    setShowOrders(newOrders)
  }


  useEffect(() => {
    getJSON()
  }, [])

  useEffect(() => {
    arrangeShowOrders()
  }, [startAt, orders])

  return (
    <div className="fullapp">
      <div id="printcontent">
        <div className="dina4">
          {showOrders.map(element=>(
            <Etiqueta order={element} />
          ))}
        </div>
      </div>
      <Menu fulfillOrders={fulfillOrders} getJSON={getJSON} setStartAt={setStartAt} startAt={startAt}/>
    </div>

  );
}

export default App;
