const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    postId: { type: String, required: true },
    commentBy: { type: String, required: true },
    commentContent: { type: String, required: true }
  },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
