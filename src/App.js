import './App.css';
import {useState, useEffect} from 'react'
import Etiqueta from './Etiqueta.js'

function App() {

  const [orders, setOrders] =useState([])
  const [orderIDs, setOrderIDs] = useState([])

  useEffect(()=>{

    const handleKeyDown = (event) => {
      if(event.key==="p" || event.key==="P"){
        console.log('WE GOT TO PRINT');
      }
      if(event.key==="t" || event.key==="T"){
        console.log('WE GOT TO TEST');

        fetch(`http://localhost:8081/testing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 3213280313544,
            location_id: 58571161800,
          })
        })
      }
      if(event.key==="Enter"){
        console.log('WE GOT TO ENTER');
        fetch(`http://localhost:8081/fullfillorder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderIDs: orderIDs
          })
        })
      }
      console.log("any other key")
    };

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  },[orders])
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
      setOrderIDs(orders.map(order=>(order.id)))
      console.log("orders", orders)
      setOrders(shopifyJSON.orders)
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
