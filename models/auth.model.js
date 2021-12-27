const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const authSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    loginAttempts: { type: Number, required: true },
    lockUntil: { type: String, required: true },
  },
);

authSchema.statics.createNew = async function (emailID, pass) {
  let password = pass;
  let passwordHash = await bcrypt.hash(password, 10)

  await this.create({
      email: emailID,
      password: passwordHash,
      loginAttempts: 0,
      lockUntil: '0',
  })
}

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
