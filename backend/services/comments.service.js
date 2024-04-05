const {commentModel} = require("../models");
const {postsModel} = require("../models");
const {userModel} = require('../models')
exports.addComment = async (payload) => {
  try {
    console.log("data back", payload.params);
    const { postId } = payload.params;
    console.log('postId: ', postId);
      const {comment,userId}=payload.body;
      console.log('comment: ', comment);
    // const databody = Object.keys(comment)[0];
    // console.log("databody: ", databody);
    if (!(await postsModel.findById(postId))) {
      throw new CustomError("No such post exists", 404);
    }
    const newComment = await commentModel.create({
      userId: userId,
      postId: postId,
      comment
    });
    console.log(newComment);
    return newComment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.getComment = async (payload) => {
  try {
     const { postId } = payload.params;
    // const{userId}= payload.body
    //  const query = { postId: postId };
    // const createdAt = payload.query.createdAt;
    
    // if (createAt) {
    //   query = { postId: postId, createAt: { $gte: new Date(createAt) } };
    // }
    console.log("postId",postId);
   
    // console.log("first", createdAt);
     const commentData = await commentModel.find({ postId}).sort()
    //  .populate({
    //     path: "user",
    //     select: "email name",
    //   })
    //   .populate({
    //     path: "post",
    //     select: "post",
    //   })
    //   .exec();
    console.log(commentData);
    return {commentData};
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.editComment = async (payload) => {
  const { commentId } = payload.params;
  console.log(commentId);
  console.log(payload.body);
  const { comment } = payload.body;
  try {
    const updateComment = await commentModel.commentModel.findByIdAndUpdate(
      commentId,
      { comment: comment },
      { new: true }
    );
    return updateComment;
  } catch (err) {
    throw err;
  }
};
exports.deleteComment = async (payload) => {
  try {
    const { commentId } = payload.params;
    console.log(commentId);
    const commentDelete = await commentModel.commentModel.findByIdAndDelete(
      commentId
    );
    return commentDelete;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
