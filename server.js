var express = require('express');
var bodyParser = require('body-parser');

const Product = require('./products');

var BASE_API_PATH = "/api/v1";

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>Catálogo de productos</h1><h2>Un saludo,</h2><h2>   Lola</h2></body></html>");
});

app.get(BASE_API_PATH + "/products", (req, res) => {
    if (req.query.category){
        console.log(Date() + " - GET /products?category=" + req.query.category);
    }else{
        console.log(Date() + " - GET /products");
    }

    Product.find({}, (err, products) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            if (req.query.category){
                res.send(products.filter((product) => {
                    return product.category == req.query.category;
                }));
            }else{
                res.send(products.map((product) => {
                
                    return product.cleanup();
                }));
            };
        };
    });
});

app.post(BASE_API_PATH + "/products", (req, res) => {
    console.log(Date() + " - POST /products");
    var product = req.body;
    Product.create(product, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});


app.put(BASE_API_PATH + "/products/:id", (req, res) => {
    console.log(Date() + " - PUT /products/" + req.params.id);
    Contact.update({"_id": req.params.id}, { $inc: {in_stock: -req.body.quantity}, $set: {price: req.body.price}}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

module.exports = app;