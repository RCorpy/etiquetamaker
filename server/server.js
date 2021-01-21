const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const Path = require("path");
const fetch = require("node-fetch");
const {api_key} = require("./../api_key.js")

app.use(express.static(Path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", async (req, res) => {

  const shopifyJSON = await fetch(`${api_key}breaster.myshopify.com/admin/api/2021-01/orders.json?status=any&fulfillment_status=unshipped&financial_status=paid&limit=8`).then(res=>res.json())
  //console.log(`${api_key}breaster.myshopify.com/admin/orders.json?status=any&fulfillment_status=unshipped&financial_status=pending`)
  res.send(shopifyJSON)
});

app.post("/fullfillorder", (req, res)=> {
  console.log("posted data", req.body.orderIDs)
  
  fetch(`${api_key}breaster.myshopify.com/admin/api/2021-01/orders/${req.body.orderIDs[0]}/fulfillments.json`,{
    fulfillment:{
      location_id: null,
      tracking_number: "fulfilled"
    }
  })

 
})

app.post("/testing", (req, res)=>{
  console.log(req.body)
  fetch(`${api_key}breaster.myshopify.com/admin/api/2021-01/orders/3213280313544/fulfillments.json`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method:'POST',
    body:JSON.stringify({fulfillment:{
      location_id: 58571161800,
      tracking_number: null,


    }})
  }).then(res=>res.json()).then(res=>console.log(res))
})
app.listen(port, function () {
  console.log("listening in port:", port);
});
