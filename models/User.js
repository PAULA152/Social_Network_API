const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Reaction');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref:'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref:'User'
    }],
  }, 
  {
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.virtual('friendcount').get(function() {return this.friends.length})
const User = model('user', userSchema);

module.exports = User;
