const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FooterContent = new Schema({
    email:{
        type:String
    },
    phone:{
        type:String
    },
    website:{
        type:String
    },
    address:{
        building:{
            type:String
        },
        street:{
            type:String
        },
        town:{
            type:String
        },
        postcode:{
            type:String
        }
    },
})


/*
const footerContent = {
  email:"example@email.com",
  phone:"+4412128937",
  website:"www.example.com",
  address:{
    building:"22",
    street:"Acacia Avenue",
    town:"Maidenhead",
    postcode:"IM3 D1E"
  }
}
*/
module.exports = mongoose.model('FooterContent', FooterContent);