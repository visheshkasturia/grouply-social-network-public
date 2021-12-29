const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    dpURL: { type: String, default: 'https://i.picsum.photos/id/610/200/200.jpg?hmac=6qOvp5zik0MBH2bc7jzgth7yzkY8IlZXay0WCNF20DM'},
    memberOf: { type : Array , default : [] },
    invitations: { type : Array , default : [] },
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
