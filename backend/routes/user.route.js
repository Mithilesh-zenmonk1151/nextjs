const router = require("express").Router();
const { updateUserProfileController } = require("../controllers");
router.get("/:id", updateUserProfileController.getUser);
router.get("/", updateUserProfileController.allUser);

router.put("/:id", updateUserProfileController.updateUserProfile);
module.exports = router;
