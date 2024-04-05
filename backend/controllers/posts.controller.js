const { postsService } = require("../services");
exports.createPosts = async (req, res) => {
 
  try {
    const userId = req.body.user;
    const response = await postsService.createPosts({title:req.body.title , body:req.body.body , files:req.files , id:userId});
    console.log("response post->>",response);
    console.log(response);
    return res.status(201).json({
      success: true,
      message: `Post Added Successfully`,
      post: response.post,
    });
  } catch (error) {
    console.log("post creation error", error);
    res.status(500).send(error);
  }
};
exports.getPost = async (req, res) => {
  try {
    const response = await postsService.getPost(req);
    return res.status(200).json({
      success: true,
      posts: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
exports.updatePost = async (req, res) => {
  try {
    const response = await postsService.updatePost(req);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
exports.deletePosts = async (req, res) => {
  try {
    const response = await postsService.deletePosts(req);
    return res.status(202).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
