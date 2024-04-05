const { reactionService } = require("../services");
exports.uploadReaction = async (req, res) => {
  try {

    const postId= req.params;
    console.log("postId",postId)
    const response = await reactionService.uploadReaction({emoji:req.body.emoji,userId:req.body.userId, id:postId});
    console.log("first", response);
    console.log("response",response);
     res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.fetchReaction = async (req, res) => {
  try {
    const response = await reactionService.getReaction(req);
    res.status(200).json(response);
  } catch (error) {
     res.status(500).json(error);
  }
};
exports.deleteReaction = async (req, res) => {
  try {
    const response = await reactionServices.deleteReaction(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateReaction = async (req, res) => {
  try {
    const response = await reactionServices.updateReaction(req);
     res.status(200).json(response);
  } catch (error) {
     res.status(500).json(error);
  }
};
