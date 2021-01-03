const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    id: Number , //número interno
    code: String, //código de barras
    name: String,
    description: String,
    category: String,
    price: Number,
    stock: Boolean,
    amount: Number

})


contactSchema.methods.cleanup = function(){
    return{code: this.code,
        name: this.name,
        description: this.description,
        category: this.category,
        price: this.price,
        stock: this.stock,
        amount: this.amount};
}

const Product = mongoose.model('Contact', contactSchema);


module.exports = Product;