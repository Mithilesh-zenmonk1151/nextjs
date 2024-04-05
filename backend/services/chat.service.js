// const chatModel = require("../models");
// const userModel = require("../models");
// const messageModel = require("../models");

// exports.accessChat = async (payload) => {
//   const { userId } = payload.body;
//   if (!userId) {
//     console.log("userId param not sent with request");
//     return res.status(400);
//   }
//   var isChat = await chatModel.chatModel
//     .find({
//       isGroupChat: false,
//       $and: [
//         { users: { $elemMatch: { $eq: payload.user._id } } },
//         { users: { $elemMatch: { $eq: userId } } },
//       ],
//     })
//     .populate("users", "-password")
//     .populate("latestMessage");
//   isChat = await UserActivation.populate(isChat, {
//     path: "latestMessage.sender",
//     select: "firstName email",
//   });
//   if (isChat.length > 0) {
//     res.send(isChat[0]);
//   } else {
//     var chatData = {
//       chatName: "sender",
//       isGroupChat: false,
//       users: [payload.user._id, userId],
//     };
//   }
//   try {
//     const createdChat = await chatModel.create(chatData);
//     const fullChat = await chatModel
//       .findOne({ _id: createdChat._id })
//       .populate("users", "-password");
//     return fullChat;
//   } catch (error) {
//     throw error;
//   }
// };
// exports.fetchChats = async (payload) => {
//   try {
//     chatModel
//       .find({ users: { $elemMatch: { $eq: payload.user._id } } })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password")
//       .populate("latestMessage")
//       .sort({ updatedAt: -1 })
//       .then(async (results) => {
//         results = await userModel.populate(results, {
//           path: "latestMessage.sender",
//           select: "firstName, email",
//         });
//         return results;
//       });
//   } catch (error) {
//     throw error;
//   }
// };

// exports.createGroupChat = async (payload) => {
//   if (!payload.body.users || !payload.body.firstName) {
//     return res.status(400).send({
//       message: "please fill all the fields",
//     });
//   }
//   if (users.length < 2) {
//     return res
//       .status(400)
//       .send("More than 2 users are required to form a group chat");
//   }
//   users.push(payload.user);
//   try {
//     const groupChat = await chatModel.chatModel.create({
//       chatName: payload.body.name,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: payload.user,
//     });
//     const fullGroupChat = await chatModel.chatModel
//       .findOne({ _id: groupChat._id })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");
//     return fullGroupChat;
//   } catch (error) {
//     throw error;
//   }
// };
// exports.renameGroup = async (payload) => {
//  try{
//   const { chatId, chatName } = payload.body;
//   const updatedChat = await chatModel.chatModel
//     .findByIdAndUpdate(
//       chatId,
//       {
//         chatName,
//       },
//       {
//         new: true,
//       }
//     )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//     return updatedChat;

//  }
//  catch(error){
//   throw error;

//  }

// };

// exports.addToGroup = async (payload) => {
//   const { chatId, userId } = payload.body;
//   const added = chatModel.chatModel
//     .findByIdAndUpdate(
//       chatId,
//       {
//         $push: { users: userId },
//       },
//       { new: true }
//     )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
//   if (!added) {
//     res.status(404);
//     throw new Error("chat not found");
//   } else {
//     return added;
//   }
// };
// exports.removeFromGroup = async (payload) => {
//   const { chatId, userId } = payload.body;
//   const remove = chatModel.chatModel
//     .findByIdAndUpdate(
//       chatId,
//       {
//         $pull: { users: userId },
//       },
//       { new: true }
//     )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
//   if (!remove) {
//     res.status(404);
//     throw new Error("chat not found");
//   } else {
//     return added;
//   }
// };

// exports.sendMessage = async (payload) => {
//   try {
//     const { conversationId, senderId, message,recieverId } = payload.body;
//     if(!conversationId && recieverId){
//       const newConversation= new messageModel({members:[senderId,recieverId]});
//       await newConversation.save();
//       const newMessage= new chatModel.chatModel({conversationId:newConversation._id,senderId,message});
//       await newMessage.save();
//     }
//     const newMessages = new chatModel.chatModel({
//       conversationId,
//       senderId,
//       message,
//     });
//     await newMessages.save();
//     return newMessages;
//   } catch (error) {
//     throw error;
//   }
// };
// exports.getMessage = async (payload) => {
//   try {
//     const conversationId = payload.params.conversationId;
//     if(conversationId==='new') return 
//     const messages = await chatModel.chatModel.find({ conversationId });
//   const messageUserData= Promise.all(messages?.map(async(message)=>{
//     const user= await userModel.userModel.findById(message.senderId);
//     return{user:{id:user._id, email:user.email,firstName:user.firstName},message:message.message}
//   }))
//     console.log("message", messages);
//     return messageUserData;
//   } catch (error) {
//     throw error;
//   }
// };
// const RoomModel = require('../models/RoomSchema')
// const UsersModel = require('../models/UserSchema')
const chatModel = require("../models");
const userModel = require("../models");
const messageModel = require("../models");
 const customError = require("../utils/error")
var mongoose = require('mongoose');
exports.userRoom = async ({ body, userId }) => {
    try {
        const receiverId = body.receiverId;
        const receiver = await userModel.userModel.findById({ _id: receiverId },
            { name: 1, _id: 1, image: 1 });
        if (!receiver)
            throw new customError("User doesn't exist", 404);
        const output = {};
        output.receiver = receiver;
        const participantsId = [(new mongoose.Types.ObjectId(userId)),
        (new mongoose.Types.ObjectId(receiverId))];
        const roomExist = await chatModel.chatModel.findOne({
            participantsId:
                { $all: participantsId }
        });
        output.room = (roomExist && roomExist.length !== 0) ?
            roomExist : await chatModel.chatModel.create({ participantsId })
        if (!output.room) throw new customerError("Room not created", 500);
        // console.log('output: ', output);
        return output
    }
    catch (err) { throw err; }
};



exports.fetchedRoom = async ({ userId }) => {
    const response = await chatModel.chatModel.find({ participantsId: userId })
                                    .populate({
                                            path: 'participantsId',
                                            select: ['_id', 'email', 'name', 'image'],
                                            match: { _id: { $ne: userId } }
                                             });
    // console.log('response: ', response);
    if (!response) throw new customError("No rooms found", 204);
    return response;
}