var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true
    },
    profilePic: String,
    tweets: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post'
  }]
});



mongoose.model('User', userSchema);