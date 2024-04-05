const mongoose = require('mongoose');
const usersModel = require('./user.model')
const chatModel = require('./chat.model')

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersModel,
        required : true
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:chatModel,
        required:true
    },
    content:{
        type:String,

    },
 
    
},{timestamps:true})
module.exports = mongoose.model('message', messageSchema)