const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogPost = new Schema({
    id:{
        type:String
    },
    author:{
        type:String
    },
    date:{
        type:String
    },
    title:{
        type:String
    },
    image:{
        type:String
    },
    content:{
        type:String
    }
})


module.exports = mongoose.model('BlogPost', BlogPost);