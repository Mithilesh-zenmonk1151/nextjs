const userModel = require("../models");
exports.updateUserProfile = async (payload) => {
  try {
    console.log(payload.params);
    const { id } = payload.params;
    const { firstName, lastName, phone, website, title, industry, summary,address } =
      payload.body;
    if (address) {
      var { street, state, city, pincode, country } =address || {};
    }
    // const image = req.file.path;
    const user = await userModel.userModel.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        latName: lastName,
        address: { street, state, city, pincode, country },
        phone: phone,
        website: website,
        // image: image,
        title: title,
        summary: summary,
        industry: industry,
      },
      { new: true }
    );
    await user.save();
    const updatedUser = await userModel.userModel.findById(id);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

exports.allUser = async (payload) => {
  try {
    // const keyword = payload.query.search
    //   ? {
    //       $or: [
    //         { firstName: { $regex: payload.query.search, $options: "i" } },
    //         { email: { $regex: payload.query.search, $options: "i" } },
    //       ],
    //     }
    //   : {};
    // const users = await userModel.userModel
    //   .find(keyword)
    //   .find({ _id: { $ne: payload.user._id } });
    const users= await userModel.userModel.find();
    const userData= Promise.all(users?.map(async(user)=>{
      return { user:{email:user.email,firstName:user.firstName},userId:user._id}
    }))

    return userData;
  } catch (error) {
    throw error;
  }
};
exports.getUser = async (payload) => {
  console.log("get user service");
  const userId = payload.params.id;
  console.log("userId", userId);
  let user;
  try {
    const connectionCount = userModel.userModel.connections
      ? userModel.userModel.connections.length
      : 0;

    user = await userModel.userModel.findById(userId, "-password");
    const count = user.connections ? user.connections.length : 0;
    console.log(count, "ÿahi cpounfgdfbhcgbfghfghfghhf");
    if (!user) {
      return "User Not Found";
    } else {
      return { user, count };
    }
  } catch (error) {
    throw error;
  }
};
