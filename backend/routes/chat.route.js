const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const { chatController } = require("../controllers");

router.post('/roomCreate', chatController.userRoom)
router.get('/roomGet', chatController.fetchedRoom)





module.exports = router;