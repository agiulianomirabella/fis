const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    productImages: Buffer,
    
    provider_name:{
        type: String,
        required:true
    },

    provider_cif:{
        type: String,
        required: true
    },
    
    category: {type: String, enum:['Mascarillas','Guantes', 'Limpieza', 'Pantallas', 'Otros']},
    price: {
        type: Number,
        min: 0,
        required: true
    },
 
    amount: {
        type: Number,
        min: 0,
        requied: true,
    },
    created: Date, //lo añadimos?
})


contactSchema.methods.cleanup = function(){
    return{
        // _id: this.id,
        code: this.code,
        name: this.name,
        description: this.description,
        productImages: this.productImages,
        provider: this.provider,
        category: this.category,
        price: this.price,
        amount: this.amount
    };
}


const Product = mongoose.model('Product', contactSchema);


module.exports = Product;