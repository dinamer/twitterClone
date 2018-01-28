var express = require('express');
var router = express.Router();

var ctrlTweets = require('../controllers/tweets.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');


// Tweet routes
router
  .route('/tweets')
  .get(ctrlTweets.tweetsGetAll)
  .post(ctrlUsers.getUserFromDb,ctrlTweets.tweetsAddOne);


// User routes
router
  .route('/users')
  .post(ctrlUsers.usersAddOne);

router
  .route('/users/:username')
  .get(ctrlUsers.usersGetOne)
  

module.exports = router;