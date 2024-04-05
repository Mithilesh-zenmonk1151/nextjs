const router = require("express").Router();
const { messageController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { auth } = authMiddleware;

router.get(
  "/allroommessages/:roomId",
  auth,
  messageController.getAllMessage
);

module.exports = router;
