const reactionModel = require("../models");
exports.uploadReaction = async (payload) => {
  console.log(payload,"payloadsdsdfe")
  const postId = payload.id.postId;


  console.log("erftfuhgrhgtghryj",postId)
  const userId = payload.userId;
  const  emoji  = payload.emoji;
  console.log(userId, postId);
  try {
    const newReaction = await reactionModel.reactionModel.create({
      userId: userId,
      postId: postId,
      emoji: emoji,
    });
    console.log(newReaction);
    return newReaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.getReaction = async (payload) => {
  
  try {
    const postId = payload.query.postId;
    const reactionData = await reactionModel.reactionModel.find(
      {postId}
    );
    console.log("first", reactionData);
    return reactionData;
  } catch (error) {
    throw error;
  }
};
exports.updateReaction = async (payload) => {
  console.log("we are at comment");
  const { reactionId } = payload.params;
  const userId = payload.query.userId;
  const { type } = payload.body;
  const user = await reactionModel.reactionModel.findById(reactionId);
  console.log("first", userId == user.userId);
  try {
    if (userId == user.userId) {
      const updateReaction = await reactionModel.reactionModel.findByIdAndUpdate(
        reactionId,
        { type: type },
        { new: true }
      );
      return updateReaction;
    }
  } catch (error) {
    throw error;
  }
};
// exports.deleteReaction = async (payload) => {
//   const { reactionId } = payload.params;
//   const userId = payload.query.userId;
//   try {
//     if (userId == (await reactionModel.reactionModel.findById(reactionId).userId)) {
//       const deleteReaction = await reactionModel.reactionModel.findByIdAndDelete(
//         reactionId
//       );
//       return deleteReaction;
//     }
//   } catch (error) {
//     throw error;
//   }
// };
exports.deleteReaction=async(payload )=>{
   
  
  try{
  
      const {reactionId} = params; 
      const userId=payload.query.userId;
      const userReaction = await reactionModel.findById(reactionId);

      if(userReaction.userId === userId){
          
          const deleteReaction = await reactionModel.findByIdAndDelete(reactionId);
          
          return deleteReaction;
      }
     
  }
  catch(error){
      throw error;
  }
};
