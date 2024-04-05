const router = require("express").Router();
const { reactionController } = require("../controllers");
router.post("/:postId", reactionController.uploadReaction),
  router.get("/", reactionController.fetchReaction),
  router.put("/:reactionId", reactionController.updateReaction),
  router.delete(":reactionId", reactionController.deleteReaction);
module.exports = router;
