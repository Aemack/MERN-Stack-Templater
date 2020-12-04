const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogContent = new Schema({
    blogImage:{
        type:String
    },
    blogIntro:{
        type:String
    }
})

module.exports = mongoose.model('BlogContent', BlogContent);