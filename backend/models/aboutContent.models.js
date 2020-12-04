const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AboutContent = new Schema({
    aboutContent:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('AboutContent', AboutContent);