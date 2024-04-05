const { commentService } = require("../services");
exports.addComment = async (req, res) => {
  try {
    const response = await commentService.addComment(req);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
exports.getComment = async (req, res) => {
  try {
    const response = await commentService.getComment(req);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error);
  }
};
exports.updateComment = async (req, res) => {
  try {
    const response = await commentService.editComment(req);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const response = await commentService.deleteComment(req);
    return res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
};
