var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var BASE_API_PATH = "/api/v1";

var products = [
    {"name": "Peter", "phone": "12345"},
    {"name": "John", "phone": "98765"}
];

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/products", (req, res) => {
    console.log(Date() + " - GET /products");
    res.send(products);
});

app.post(BASE_API_PATH + "/products", (req, res) => {
    console.log(Date() + " - POST /products");
    var product = req.body;
    products.push(product);
    res.sendStatus(201);
});



app.listen(port);

console.log("Server ready!")






