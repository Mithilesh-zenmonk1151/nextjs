const mongoose = require('mongoose');
const userModel = require('./user.model')

const chatSchema = new mongoose.Schema({
    participantsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required : true
    }]

    
  


},{timestamps:true })
module.exports = mongoose.model('room', chatSchema)