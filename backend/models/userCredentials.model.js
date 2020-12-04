const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserCredentials = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model('UserCredentials', UserCredentials);