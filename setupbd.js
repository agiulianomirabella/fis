const mongoose = require('mongoose');
const dbconnect = require('./db');
const ApiKey = require('./apikeys.js');
const dbConnect = require('./db');

dbConnect().then(
    ()=>{
        const user= new ApiKey({user:'fis'});
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log('User: '+ user.user + ", "+ user.apikey+ "saved");
            }

        })
    }
)