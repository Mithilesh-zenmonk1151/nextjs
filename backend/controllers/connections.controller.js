const { connectionService } = require("../services");

const customError = require("../utils/error");

exports.uploadingConnection = async (req, res) => {
  try {
    console.log("first", req.params);
    if (!res.locals.isAuthenticated) {
      throw new customError("User not authorised", 401);
    }
    const senderId = req.user.ID;
    const response = await connectionService.uploadconnection(
      req.params,
      senderId
    );
    console.log("first", response);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.fetchConnection = async (req, res) => {
  try {
    if (!res.locals.isAuthenticated) {
      throw new customError("User not authorised", 401);
    }
    const userId = req.user.ID;
    const response = await connectionService.fetchconnection(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message});
  }
};

exports.fetchSuggestion = async (req, res) => {
  try {
    if (!res.locals.isAuthenticated) {
      throw new customError("User not authorised", 401);
    }
    const userId = req.user.ID;
    const response = await connectionService.fetchsuggestion(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message  });
  }
};

exports.updatingConnection = async (req, res) => {
  try {
    if (!res.locals.isAuthenticated) {
      console.log("locals: ");
      throw new customError("User not authorised", 401);
    }

    console.log("req.body: ", Object.keys(req.body)[0]);
    const userId = req.user.ID;
    const response = await connectionService.updateConnection(
      req.params,
      userId,
      Object.keys(req.body)[0]
    );
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message });
  }
};

//  try{

//     // const response = await ConnectionModel.find({ $or: [ { senderId: userId }, { recieverId: userId } ] });
//     const response = await ConnectionModel.aggregate([{

//         $match:{
//             $or:[
//                 {Status :'Pending' , senderId:userId},
//                 {Status:'Accepted' , $or:[{senderId:userId},{receiverId:userId}] }
//             ]
//         }
//         },
//         {
//             $group:{
//                 _id:'$Status',
//                 data:{$push:'$$ROOT'}
//             }
//         }
//     ]);

//     return response;

//    }
//    catch(err){
//     console.log(err)
//     throw err;
// }
