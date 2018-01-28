var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
  text : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});


mongoose.model('Post', postSchema);
