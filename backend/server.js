const express = require("express");
const data = require("./data.js");
var cors = require('cors');



require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/userrouter.js");
app = express();
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const stripe = require("stripe")("sk_test_51I2qtVIRjomGEzPfAx1cgrAGoKkgWtjHjvwjGdL0D3DYuJCo8Pw8A350oDE2h8qO48CicccLUNB13SqRQNbMccGs00BYEWtkt9")
const uuid = require("uuid");

app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.json());


app.use(express.static("public"));


mongoose.connect('mongodb://localhost/amazona', {useNewUrlParser : true, useUnifiedTopology: true});

app.use("/api/users", router);

app.get("/api/products", function(req,res){
     ////console.log("glgl");
      res.send(data.products);
})

app.get("/api/products/:id", function(req,res){
     res.send(data.products[req.params.id-1]);
})

app.listen(5000, function(){
    console.log("server has started !!");
})

app.post("/checkout", async (req, res) => {
     console.log("Request:", req.body);
   
     let error;
     let status;
     try {
       const { product, token } = req.body;
   
       const customer = await stripe.customers.create({
         email: token.email,
         source: token.id
       });
   
       const idempotency_key = uuid();
       const charge = await stripe.charges.create(
         {
           amount: product.price * 100,
           currency: "usd",
           customer: customer.id,
           receipt_email: token.email,
           description: `Purchased the ${product.name}`,
           shipping: {
             name: token.card.name,
             address: {
               line1: token.card.address_line1,
               line2: token.card.address_line2,
               city: token.card.address_city,
               country: token.card.address_country,
               postal_code: token.card.address_zip
             }
           }
         },
         {
           idempotency_key
         }
       );
       console.log("Charge:", { charge });
       status = "success";
     } catch (error) {
       console.error("Error:", error);
       status = "failure";
     }
   
     res.json({ error, status });
   });