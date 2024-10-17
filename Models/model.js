const mongoose = require('mongoose')

const dbSchema = mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:true
    }

})

const UserModal = mongoose.model('user',dbSchema)
module.exports = UserModal;