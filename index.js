var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb')

var port = (process.env.PORT || 3000);
var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME = __dirname + "/products.json";

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());

var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>Hola Lola!</h1><h2>Un saludo,</h2><h2>   Giuliano</h2></body></html>");
});

app.get(BASE_API_PATH + "/products", (req, res) => {
    if (req.query.category){
        console.log(Date() + " - GET /products?category=" + req.query.category);
    }else{
        console.log(Date() + " - GET /products");
    }

    db.find({}, (err, products) => {
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
                delete product._id;
                return product;
                }));
            };
        };
    });
});

app.post(BASE_API_PATH + "/products", (req, res) => {
    console.log(Date() + " - POST /products");
    var product = req.body;
    db.insert(product, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

//Pasar el producto entero
app.put(BASE_API_PATH + "/products/:id", (req, res) => {
    console.log(Date() + " - PUT /products/" + req.params.id);
    db.update({"_id": req.params.id}, { $inc: {in_stock: -req.body.quantity}, $set: {price: req.body.price}}, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});


app.listen(port);

console.log("Server ready!")


//Prueba

