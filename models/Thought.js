const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require('moment');
// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactioncount").get(function () {
  return this.reactions.length;
});
const Thought = model("thought", thoughtSchema);
module.exports = Thought;
