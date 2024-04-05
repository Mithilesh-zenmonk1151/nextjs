const { chatService } = require("../services");

// exports.sendMessage = async (req, res) => {
//   try {
//     const response = await chatService.sendMessage(req);
//     console.log("Response", response);
//     res.status(200).json({
//       success: true,
//       newMessages: response,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// exports.getMessage = async (req, res) => {
//   try {
//     const response = await chatService.getMessage(req);
//     res.status(200).json({
//       success: true,
//       messageUserData: response,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// exports.createGroupChat = async (req, res) => {
//   try {
//     const response = await chatService.createGroupChat(req);
//     res.status(201).json({
//       success: true,
//       message: `Group made successfully`,
//       fullGroupChat: response,
//     });
//   } catch (error) {
//     console.log("Chat group creation error", error);
//     res.status(500).send(error);
//   }
// };

const customError = require("../utils/error");


exports.userRoom = async (req, res) => {
    try {

        if (!res.locals.isAuthenticated) {
            throw new customError("User not authorised", 401)
        }
        const userId = req.user.ID;

        const response = await chatService.userRoom({ body: req.body, userId: userId });
        return res.status(201).json(response)
    }
    catch (error) {
        return res.status( 500).json({ message: error.message })
    }
};

exports.fetchedRoom = async (req, res) => {
    try {

        if (!res.locals.isAuthenticated) {
            throw new customError("User not authorised", 401)
        }
        const userId = req.user.ID;

        const response = await chatService.fetchedRoom({ userId: userId });
        return res.status(201).json(response)
    }
    catch (error) {
        return res.status( 500).json({ message: error.message  })
    }
};