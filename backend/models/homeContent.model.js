const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HomeContent = new Schema({
    about: {
        name:{
            type:String
        },
        tagline:{
            type:String
        },
        aboutContent:{
            type:String
        }    
    },
    photogridContent: {
        type: Array
    }
})

module.exports = mongoose.model('HomeContent', HomeContent);