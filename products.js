const mongoose = require('mongoose');

// const contactSchema = new mongoose.Schema({
//     code: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     description: String,
    
//     provider_name:{
//         type: String,
//         required:true
//     },

//     provider_cif:{
//         type: String,
//         required: true
//     },
    
//     category: {type: String, enum:['Mascarillas','Guantes', 'Limpieza', 'Pantallas', 'Otros']},
//     price: {
//         type: Number,
//         min: 0,
//         required: true
//     },
 
//     amount: {
//         type: Number,
//         min: 0,
//         required: true,
//     }
// })

const contactSchema = new mongoose.Schema({
    code: String,
    name: String,
    description: String,
    provider_name: String,
    provider_cif: String,
    category: String,
    price: Number,
    amount: Number
})

contactSchema.methods.cleanup = function(){
    return{
        code: this.code,
        name: this.name,
        description: this.description,
        provider_name: this.provider_name,
        provider_cif: this.provider_cif,
        category: this.category,
        price: this.price,
        amount: this.amount
    };
}


const Product = mongoose.model('Product', contactSchema);


module.exports = Product;