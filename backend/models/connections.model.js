const mongoose = require('mongoose');
const usersModel = require('./user.model')

const ConnectionsSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersModel,
        required : true
    
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersModel,
        required : true
    
    },
    Status:{
        type:String,
        enum:['Pending' , 'Accepted' ,'Rejected', 'Deleted' ,'Withdraw']
    }

   


 
},{timestamps:true })
module.exports = mongoose.model('connection', ConnectionsSchema)