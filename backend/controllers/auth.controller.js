const { userService } = require("../services");
const handleError = require("../utils");

exports.signup = async (req, res) => {
  try {
    const response = await userService.signup(req);
    return res.status(200).json({
      message: "Signup successfull",
      user: response.user,
    });
  } catch (error) {
    console.log(error);
    handleError.handleError.handleError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const response = await userService.login(req, res);
    if (response.status === 400) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
  } catch (error) {
    if (error.name === "INVALIDUSER") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    if (error.name === "INVALIDPASSWORD") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
};
