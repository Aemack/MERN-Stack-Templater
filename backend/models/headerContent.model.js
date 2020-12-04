const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HeaderContent = new Schema({
    name:{
        type:String
    },
    logo:{
        type:String
    },
    tagline:{
        type:String
    }
})


module.exports = mongoose.model('HeaderContent', HeaderContent);