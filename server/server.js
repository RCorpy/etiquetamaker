const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const Path = require("path");
const fetch = require("node-fetch");
const api_key = require("./../api_key.js")

app.use(express.static(Path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", async (req, res) => {
  const shopifyJSON = await fetch(`https://6bff852990239ea7e31b1b5b352c3f04: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@breaster.myshopify.com/admin/api/2021-01/orders.json?status=any&fulfillment_status=unshipped&financial_status=paid&limit=2`).then(res=>res.json())
  console.log(`${api_key}breaster.myshopify.com/admin/orders.json?status=any&fulfillment_status=unshipped&financial_status=pending`)
  res.send(shopifyJSON)
});


app.listen(port, function () {
  console.log("listening in port:", port);
});
