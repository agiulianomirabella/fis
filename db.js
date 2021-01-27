const mongoose = require('mongoose');
const DB_URL = (process.env.MONGODB_URI || 'mongodb://db/test');
// const DB_URL = ("mongodb+srv://user0:etwB8JAXa2aTPokB@product.8m7zl.mongodb.net/Products?retryWrites=true&w=majority" || 'mongodb://db/test');

const dbConnect = function() {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    return mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = dbConnect;



// const mongoose= require('mongoose');

// // const DB_URL=(process.env.MONGODB_URI || 'http://host.docker.internal:3000/api/v2');
// const DB_URL=(process.env.MONGODB_URI || 'mongodb://db/test');

// const dbConnect= function(){
//     const db=mongoose.connection; 
//     db.on('error', console.error.bind(console, 'connection error: ')); 
//     return mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     // return mongoose.connect(DB_URL,{useNewUrlParser:true});
// }

// module.exports =dbConnect;