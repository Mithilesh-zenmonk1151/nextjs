
const customError = require('../utils/error')
const userModel = require('../models')
const connectionModel  =require("../models")
var ObjectId = require('mongodb').ObjectId;
exports.uploadconnection = async(params,senderId)=>{

    try {
        const {receiverId}=params;
       
    
 const user = userModel.findById(receiverId);
 if (!user)
     throw new customError("User does not exist", 404);
     const connection = await connectionModel.connectionModel.findOne({ $or: [{senderId:senderId , receiverId:receiverId }, { senderId:receiverId , receiverId:senderId }] })
     if(!connection){
        const newConnection = await connectionModel.connectionModel.create({senderId:senderId , receiverId:receiverId , Status:'Pending'})
        console.log(newConnection)
        return newConnection;
     }
     if (connection.Status !== 'Withdraw')
    throw new customError("Already connection exist", 401);
    if ((new Date()).getTime() - connection.updatedAt.getTime() > 1855058823) //greater than new date by 3 weeks
    {
        const response = await connectionModel.connectionModel.findByIdAndUpdate(connection._id, { Status: 'Pending' }, { new: true })
        return response;
    }
    throw new customError("Required 3 weeks waiting time to request again ", 409);
       
    }
    catch(err){
        console.log(err)
        throw err;
    }

};




exports.fetchconnection = async(userId)=>{     //userId from authentication

 
//    try{
   
//     const response = await ConnectionModel.find({ $or: [ { senderId: userId }, { recieverId: userId } ] }); 
   
//     const output={};
//     let request , connection , reject;
//     if(response.length > 0){
        
//         request= response.filter((rqst)=>  {  return rqst.Status=== 'Pending' && (rqst.senderId).toString() === userId});
//         console.log('request: ', request);
//         connection= response.filter((rqst)=> { return rqst.Status=== 'Accepted' && ((rqst.receiverId).toString() === userId  || (rqst.senderId).toString() === userId)});
//         reject = response.filter((rqst)=> { return rqst.Status=== 'Deleted' && ((rqst.receiverId).toString() === userId  || (rqst.senderId).toString() === userId)});

//     }
//     output.pendingrequest=request;
//     output.connected=connection;
//     output.cancel=reject;
//     return output;
 
//    }
try{
   
    // const response = await ConnectionModel.find({ $or: [ { senderId: userId }, { recieverId: userId } ] }); 
   const myId = new ObjectId(userId);
    const response = await connectionModel.aggregate([{
        
        $match:{
            $or:[
                {Status :'Pending',receiverId:myId },
                {Status:'Accepted',  $or:[{senderId:myId},{receiverId:myId}]}
            ]
        }
        },
        {
            $lookup:{
                from:'users',
           
                localField: 'senderId',
                foreignField: '_id',
                pipeline:[{$project:{ name : 1}}],
                as: 'sendername'

            }
        },
        {
            $group:{
                _id:'$Status',
                data: { $push: '$$ROOT' }
            }
        }
    ]);
   

    const transformedResponse = response.reduce((acc, curr) => {
        acc[curr._id] = curr.data;
        return acc;
    }, {});
    
    const ids=  transformedResponse['Accepted']?.map(connection =>(connection.senderId).toString() === (myId).toString() ?  connection.receiverId : connection.senderId )
    
    
    const accepted = await userModel.find({_id : {$in : [...ids]} }); 
    
    
    transformedResponse['Accepted']=accepted;
    console.log('transformedResponse: ', transformedResponse['Accepted']);
    return transformedResponse;
   }
   catch(err){
    console.log(err)
    throw err;
}

};
exports.fetchsuggestion = async(userId)=>{     //userId from authentication

 
    try{
        const result = await connectionModel.find({$and : [{ $or: [ { senderId: userId }, { receiverId: userId } ] } , { $nor: [ { Status: 'Rejected' }, { Status: 'Deleted' } ] }]}); 
   
        const ids= result?.map(connection => (connection.senderId).toString()=== userId ?  connection.receiverId : connection.senderId )
       
       
     const response = await UsersModel.find({_id : {$nin : [...ids,userId]} }); 
    
 
     return response;
  
    }
    catch(err){
     console.log(err)
     throw err;
 }
 
 };


 exports.updateConnection=  async(params , userId , body)=>{
    try{
        const {connectionId}=params;
   
        const status = body;
        if (!connectionId)
        throw new customError("Connection id is required", 401);
        const response = await connectionModel.findById(connectionId);
        if(!response){
            throw new customError("No connection found", 400);   
        }
        if (!status)
        throw new customError("Status is required", 401);
    if (status === 'Pending')
        throw new customError(" Bad request", 400);
    if (status === 'Withdraw' && response.Status === 'Pending' && (response.senderId).toString() === userId) {
        const res = connectionModel.findOneAndUpdate({ senderId: userId, _id: connectionId }, { Status: status }, { new: true, upsert: true })
        console.log('res: ', res);
        return res;
    }
    else if (status === 'Accepted' || status === 'Rejected') {
        const res = connectionModel.findOneAndUpdate({ receiverId: userId, _id: connectionId }, { Status: status }, { new: true, upsert: true })
        console.log('res: ', res);
        return res;
    }
    else if (status === 'Deleted' && response.Status === 'Accepted') {
       
        const res = connectionModel.findOneAndUpdate({ $or: [{ _id: connectionId, receiverId: userId }, { senderId: userId, _id: connectionId }] }, { Status: status }, { new: true, upsert: true })
        // console.log('res: ', res);
        return res;
    }

    }
    catch(err){
        console.log(err)
        throw err;
    }


 }

 