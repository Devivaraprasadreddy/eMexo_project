const mongoose=require('mongoose');
const myproject=mongoose.Schema;
const logindata=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});

module.exports=mongoose.model('logindatar',logindata);