var mongoose = require('mongoose');
var Post = mongoose.model('Post');


//add tweet to the database
module.exports.tweetsAddOne = function(req, res) {
  
  var userId = req.user._id; //Added to req obj through middleware
  
 Post
    .create({
      text : req.body.text,
      createdOn: req.body.createdOn,
      userId: userId
      }, function(err, post) {

          if (err) {
            console.log("Error creating tweet");
              res
                .status(500)
                .json(err);
          }

      req.user.tweets.push(post._id);
      req.user.save(function(err, userUpdated) {
          if (err) {
            console.log("Error updating user");
                res
                .status(500)
                .json(err);
          } else {
                res
                .status(201)
                .json(post);
          }
      });
});
}


//get tweets from the database
module.exports.tweetsGetAll = function(req, res) {

  var count = 30;
  var maxCount = 50;

   if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied, count must be number"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }
  Post
    .find()
    .populate('userId')
    .limit(count)
    .exec(function(err, tweets) {
      console.log(err);

      if (err) {
        console.log("Error finding tweets");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found tweets", tweets.length);
        res
          .status(200)
          .json(tweets);
      }
    });

};

module.exports.tweetsGetAllByUser = function(req, res) {

  var count = 10;
  var maxCount = 50;

   if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied, count must be number"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }
  Post
    .find({userId: req.userId})
    .limit(count)
    .exec(function(err, tweets) {
      console.log(err);
      console.log(tweets);
      if (err) {
        console.log("Error finding tweets");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found tweets", tweets.length);
        res
          .json(tweets);
      }
    });

};










