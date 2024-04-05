const mongoose = require("mongoose");
const user = require("./user.model");
//  const post= require("./posts.model")
const { ObjectId } = require("mongodb");
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comment-schema", commentSchema);
