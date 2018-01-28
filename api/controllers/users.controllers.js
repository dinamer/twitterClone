var mongoose = require('mongoose');
var User = mongoose.model('User');


//add user to the database
module.exports.usersAddOne = function(req, res) {

  var username = req.body.username;

  // check if username already exists
  User.findOne({ 'username' :  username }, function(err, user) {
        if (user) {
          console.log('User already exists with username: ' + username);
          res
          .status(400)
          .json(err);
        } else {
  // if there is no user, create one
          User
            .create({ 
                _id : new mongoose.Types.ObjectId(),
                username : req.body.username,
                profilePic: req.body.profilePic      
            }, function(err, user) {
                if (err) {
                  console.log(err);
                  res
                  .status(400)
                  .json(err);
                } else {
                  console.log("user created!", user);
                  res
                  .status(201)
                  .json(user);
                }
            });
  }
})
};

//get user from the database
module.exports.usersGetOne = function(req, res) {
  var un = req.params.username;

  User
    .findOne({username: un})
    .populate('tweets')
    .exec(function(err, user) {
      var response = {
        status : 200,
        message : user
      };
      if (err) {
        console.log("Error finding user");
        response.status = 500;
        response.message = err;
      } else if(!user) {
        console.log("Username not found in database", un);
        response.status = 404;
        response.message = {
          "message" : "Username not found " + un
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};


//Middleware to simulate logged-in user
module.exports.getUserFromDb = function(req, res, next) {
  var username = req.body.username;

  User.findOne({ username :  username }).exec(function(err, user) {

        if (err) {
          console.log("Error finding user");
          res
              .status(500)
              .json(err); 
        } else if(!user) {
          console.log("Username not found in database", username);
          res
              .status(404)
              .json(err); 
        } else {
              req.user = user;
              res.user = user;
              next(); 
      }
  }) 
};











