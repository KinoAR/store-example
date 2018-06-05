const express = require("express");
const mongo = require("./queries");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.set('json spaces', 2);
mongo.createCollection("products");
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products", (req, res) => {
  mongo.findDocument("products",{}).then( val => {
    res.json(val);
  })
});

app.post("/postProduct", (req, res) => {
  console.log(req.body);
  mongo.insertDocument("products",{
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  }).then( val => {
    res.send("Request Went Through");
  })
});
app.listen(4030);