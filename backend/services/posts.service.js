const { postsModel } = require("../models");
const path = require("path");
exports.createPosts = async ({ title, body, files, id }) => {
  // console.log("createPosts: ");
  // console.log(payload.body, "post");
  try {
    // const userId = payload.id;
    // console.log(payload.id,"dgthfgjhiuyo879oui")
    // const { title, body} = payload;
    // const images=payload.images;
    // console.log(images,"tjiosfXhgz")
    // console.log("payload: ", payload);
    // console.log("payload.files: ", payload.files);
    // let newImages
    //  if(payload.files.images!==null )
    //    newImages = payload.files.images?.map((image) => {
    //     return image.path;
    //   })
    //   console.log(images);

    // const post = new postsModel({
    //   userId,
    //   title,
    //   body,
    //   files:payload.file.path,
    // });
    const images = files?.map((i) => {
      return i.path;
    });

    const Post = await postsModel.create({
      title: title,
      body: body,
      user: id,
      images: images,
    });
    return { Post };
  } catch (error) {
    console.log(error);
    return error;
  }
};
exports.getPost = async (payload) => {
  const { userId } = payload.params;
  console.log(userId);
  try {
    const posts = await postsModel.find().sort({ createdAt: -1 });
    console.log('posts: ', posts);
    // console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.updatePost = async (payload) => {
  const { id } = payload.params;
  const { body, title } = payload.body;

  try {
    const updated = await postsModel.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    console.log(updated);
    return updated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
exports.deletePosts = async (payload) => {
  const { id } = payload.params;
  try {
    const deleted = await postsModel.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
