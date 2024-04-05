const router = require("express").Router();
const { commentController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const { auth } = authMiddleware;

router.post("/:postId",  commentController.addComment);
router.get("/:postId", commentController.getComment);
router.put("/:postId/:commentId", auth, commentController.updateComment);
router.delete("/:postId/:commentId", auth, commentController.deleteComment);
module.exports = router;
