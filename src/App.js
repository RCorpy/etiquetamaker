import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'

function App() {

  const [orders, setOrders] =useState([])
  const [orderIDs, setOrderIDs] = useState([{id:0, qty: 0}])

  useEffect(()=>{

    const handleKeyDown = (event) => {
      if(event.key==="p" || event.key==="P"){
        console.log('WE GOT TO PRINT');
        const restorePage = document.body.innerHTML
        const printContent = document.getElementById("printcontent").innerHTML

        document.body.innerHTML=printContent
        window.print()
        document.body.innerHTML=restorePage
      }
      if(event.key==="t" || event.key==="T"){
        console.log('WE GOT TO TEST')
        console.log(orderIDs)
      }
      if(event.key==="Enter"){
        console.log('WE GOT TO ENTER');
        fetch(`http://localhost:8081/fullfillorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: orderIDs
          })
        })
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[orders, orderIDs])
  useEffect(() => {
    async function getJSON(){
      const shopifyJSON = await fetch(`http://localhost:8081/`).then(res=>res.json())
      const orders = shopifyJSON.orders
      const ordersLenght = orders.length
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
      setOrderIDs(orders.map(order=>({id: order.id, qty: order.line_items[0].quantity})))
      console.log("orders", orders)
      setOrders(shopifyJSON.orders)
    }
  getJSON()

  }, [])

  return (
    <div id="printcontent">
      <div className="dina4">
        {orders.map(element=>(
          <Etiqueta order={element} />
        ))}
      </div>
    </div>
  );
}

export default App;
