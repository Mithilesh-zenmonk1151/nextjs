// const messageModel = require("../models");
// const userModel = require("../models");
// const chatModel = require("../models/chat.model");
// exports.sendMessage = async (payload) => {
//   const { senderId, recieverId } = payload.body;

//   var newMessage = {
//     sender: senderId,

//     reciever: recieverId,
//   };
//   console.log("new Message", newMessage);
//   try {
//     // const message = await messageModel.messageModel.create(newMessage);
//     // message = await message.populate("sender", "name");
//     // message = await message.populate("reciever", "name");
//     // message = await message.populate("chat");
//     // message = await userModel.populate(message, {
//     //   path: "chat.users",
//     //   select: "firstName, email",
//     // });
//     // await chatModel.findByIdAndUpdate(payload.body.chatId, {
//     //   latestMessages: message,
//     const { senderId, recieverId } = payload.body;
//     const newConversation = new messageModel.messageModel({
//       members: [senderId, recieverId],
//     });
//     await newConversation.save();

//     return newConversation;
//   } catch (error) {
//     throw error;
//   }
// };
// exports.getAllMessages = async (payload) => {
//   try {
//     // const messages = await messageModel
//     //   .find({ chat: payload.params.chatId })
//     //   .populate("sender", "name email")
//     //   .populate("chat");
//     // return messages;
//     const userId = payload.params.userId;
//     const messages = await messageModel.messageModel.find({
//       members: { $in: [userId] },
//     });
//     const messageUserData = Promise.all(
//       messages?.map(async (message) => {
//         const recieverId = message.members.find((member) => member != userId);
//         const user = await userModel.userModel.findById(recieverId);
//         return {
//           user: { email:user.email, firsName: user.firstName },
//           conversationId: message._id,
//         };
//       })
//     );
//     console.log("messageUserData", await messageUserData);
//     return await messageUserData;
//   } catch (error) {
//     throw error;
//   }
// };


const customError = require('../utils/error');
const messageModel = require('../models')
const mongoose = require('mongoose')


exports.fetchMessages = async(params)=> {
    const {roomId} = params;
    if(!roomId) throw new customError("Id is required", 403);


    const messages = await messageModel.messageModel.find({roomId});

    if(!messages) throw new closedustomError("No messages exist for this room", 204);
    return messages;
}
