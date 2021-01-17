var express = require('express');
var bodyParser = require('body-parser');

const Product = require('./products.js');
const https = require('https');

var BASE_API_PATH = "/api/v1";

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<html><body><h1>Catálogo de productos</h1><h2>Un saludo,</h2><h2>   Lola</h2></body></html>");
});

app.get(BASE_API_PATH + "/products", (req, res) => {
    
    Product.find({}, (err, products) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            if (req.query.category){
                console.log(Date() + " - GET /products?category=" + req.query.category);
                res.send(products.filter((product) => {
                    return product.category == req.query.category;
                }));
            }

            //añadir un filtro con nombre de proveedor --> hacerlo a través de integración
                        
            else{
                console.log(Date() + " - GET /products");
                res.send(products.map((product) => {
                    return product.cleanup();
                }));
            };
        };
    });
});


app.get(BASE_API_PATH+"/products/:code", (req, res)=>{
    Product.findOne({code: req.params.code}, (err, product)=>{
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else if(product){
            console.log(Date() + " - GET /products/"+ req.params.id);
            res.status(200).send(product.cleanup())
        }
        
        else{
            console.log(Date() + " - No product available with this code: "+ req.params.code);
            res.sendStatus(404);
        }
    })
    
})

app.get(BASE_API_PATH+"/products?search=", (req, res)=>{
    console.log(Date() + " - GET /products/ by text= "+req.query.search);
    Product.find({$text:{$search:q}}, (err, products)=>{
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else{
            res.status(200).send(products.cleanup())
        }
    })

});



app.delete(BASE_API_PATH + "/products/:code", (req, res)=>{

    console.log(Date() + " - Delete /products/"+req.params.code);
    
    Product.findOneAndRemove({code: req.params.code}, (err, product)=>{
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else{
            res.sendStatus(204);
        }
    })
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

app.patch(BASE_API_PATH + "/products/:code", (req, res) => {
    console.log(Date() + " - PATCH /products/" + req.params.code + " amount:" + req.body.amount);

    Product.findOne({code: req.params.code}, (err, product)=>{
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else if(product){
            if (product.amount + req.body.amount >= 0){
                console.log("Allowed amount");
                Product.updateOne({code: req.params.code}, { $inc: {amount: req.body.amount}}, (err) => {
                    if (err) {
                        console.log(Date() + " - " + err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            } else {
                console.log("Forbidden amount:");
                console.log(Date() + "Product " + req.params.code + " cannot be updated by " + req.body.amount + " units. Only " + product.amount + " in stock.");
                res.sendStatus(400);
            }
        }        
        else{
            console.log(Date() + " - No product available with this code: "+ req.params.id);
            res.sendStatus(400);
        }
    })

});



app.put(BASE_API_PATH + "/products/:code",(req,res)=>{
    console.log(Date() + " - PUT /products/" + req.params.id);
    Product.findOne({code: req.params.code}, (err, product)=>{
        if(err){
            console.log(Date()+ " - "+err);
            res.sendStatus(500);
        }else if(!product){
            console.log(Date()+" - PUT /products/"+req.params.code + " Error: Product not found");
            res.sendStatus(404);
        }else{
            product.name= req.body.name;
            product.description= req.body.description;
            product.productImages= req.body.productImages;
            product.category= req.body.category;
            product.price= req.body.price;
            product.stock= req.body.stock;
            product.amount= req.body.amount;        

            product.save((err, product) =>{
                if(err){
                    console.log(Date()+ " - "+err);
                    res.status(500);
                }else{
                    console.log(Date()+" - PUT /products/"+req.params.code + " Product have been updated");
                    res.status(200);
                    return res.send(product.cleanup());
                }
            })
        }
        
    })
});

module.exports = app;