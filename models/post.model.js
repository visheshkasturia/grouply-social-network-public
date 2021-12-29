const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    postTitle: { type: String, required: true },
    postContent: { type: String, required: true },
    createdBy: { type: String, required: true },
    partOf: { type: String, required: true},
    likes: {type: Number, default: 0},
    likedBy: { type : Array , default: [] },
    hiddenBy: { type : Array , default: [] },
    isFlagged: {type: Array, default: [] },
    flaggedBy: { type : Array , default: [] },
    allComments: { type : Array , default: [] },
    allAttachment: { type : Array , default: [] },
    hashTags: { type : Array , default: [] },
    dateCreated: {type: Number, default: Date.now()}
  },
);

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;
