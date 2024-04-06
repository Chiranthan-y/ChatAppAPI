const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.param('userId',userController.GetUserById);

router.get('/:userId',(req,res) => {
  res.send('hi');
});

module.exports = router;