const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
isvarified:{
    type:Number,
    required:true
},
isAdmin:{
    type:Number,
    required:true
}

});

module.exports = mongoose.model("users",userSchema)