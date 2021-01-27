const mongoose= require('mongoose');

// const DB_URL=(process.env.MONGODB_URI || 'http://host.docker.internal:3000/api/v2');
const DB_URL=(process.env.MONGODB_URI || 'mongodb://db/test');

const dbConnect= function(){
    const db=mongoose.connection; 
    db.on('error', console.error.bind(console, 'connection error: ')); 
    return mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // return mongoose.connect(DB_URL,{useNewUrlParser:true});
}

module.exports =dbConnect;