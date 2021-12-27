const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    description: { type: String },
    createdBy: {type: String, required: true},
    privacy: { type: Number, required: true }, // 0 for public 1 for private
    allMembers: { type : Array , default: [] },
    allPosts: { type : Array , default: [] },
    admins: { type : Array , default: [] },
    pending: { type : Array , default: [] },
    tags: { type : Array , default: [] },
    dateCreated: {type: Number, default: Date.now()},
  },
);

const Groups = mongoose.model('Groups', groupSchema);
module.exports = Groups;
