const router = require("express").Router();
const { connectionController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { auth } = authMiddleware;
router.post('/user/connection/:receiverId' , auth, connectionController.uploadingConnection),
router.get('/user/connection', auth ,connectionController.fetchConnection),
router.get('/user/suggestion', auth ,connectionController.fetchSuggestion),
router.put('/user/connection/:connectionId' ,auth ,connectionController.updatingConnection)

module.exports = router;
