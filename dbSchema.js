const mongoose = require('mongoose')
const validator = require('validator')

var  userSchema = new mongoose.Schema({
    firstName:{type:'string', required:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validator:(value)=>{
            return validator.isEmail(value)
        }
    },
    password:{type:'string', required:true},
    role:{type:'string', default:'student'},
    createdAt: {type:Date, default:Date.now()}
})

let usersModel = mongoose.model('users', userSchema)
module.exports={mongoose, usersModel}