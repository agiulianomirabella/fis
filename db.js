const mongoose= require('mongoose');

const MONGODB_URI = "mongodb+srv://user0:BnJAOAYqaaeD2yfz@product.8m7zl.mongodb.net/Product?retryWrites=true&w=majority";

const DB_URL=(process.env.MONGODB_URI || 'mongodb://db/test');

const dbConnect= function(){
    const db=mongoose.connection; 
    db.on('error', console.error.bind(console, 'connection error: ')); 
    return mongoose.connect(DB_URL,{useNewUrlParser:true}); 
    
}

module.exports =dbConnect;