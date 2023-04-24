const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.post('/index', authController.register);



module.exports = router;