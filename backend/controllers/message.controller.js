const { messageService } = require("../services");
const customError = require("../utils/error");
// exports.sendMessage = async (req, res) => {
//   try {
//     const response = await messageService.sendMessage(req);

//     console.log(response);
//     return res.status(201).json({
//       success: true,
//       messageUserData:response
     
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.getAllMessage = async (req, res) => {
//   try {
//     const response = await messageService.getAllMessages(req);
//     return res.status(200).json({
//       success: true,
//       messages: "comment get succesfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error);
//   }
// };
exports.getAllMessage = async (req, res) => {
                                      
    try {
        if (!res.locals.isAuthenticated) {
            throw new customError("User not authorised", 401)
        }
      

        const response = await messageService.fetchMessages(req.params);
        return res.status(201).json(response)
    }
    catch (error) {
        return res.status( 500).json({ message: error.message })
    }
};
