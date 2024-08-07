
const mongoose=require('mongoose');
const { type } = require('os');


const myproject=mongoose.Schema;
const registerdata=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        
        type:String,
        required:true
    },
    // number:{
    //     type:String,
    //     require:true
    
        
    // }
  
   
});

module.exports = mongoose.model('registerdatar',registerdata);
