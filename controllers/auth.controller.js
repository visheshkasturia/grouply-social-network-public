/* istanbul ignore file */
const router = require('express').Router();
const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const bcrypt = require('bcryptjs/dist/bcrypt');


router.route('/').get(async (request, response) => {
  response.send("Welcome to Auth API")
});

router.route('/login').post(async (request, response) => {
  console.log('Auth controller called')
  const userAuth = request.body;
  const foundUser = await Auth.findOne({ email: userAuth.email });

  if (!foundUser) {
    response.status(404).send('User not found');
  } else {
    if (Date.now > foundUser.lockUntil) {
      console.log('here')
      bcrypt.compare(userAuth.password, foundUser.password, async (err, res) => {
        if (err) {
          response.send(402).send('Error')
        } else if (res) {
          console.log('in success')
          userData = await User.findOne({ email: userAuth.email});
          const cookieData = {
            login: 'success',
            _id: userData._id,
            fullName: userData.fullName,
            email: userData.email,
            userName: userData.userName,
          }
          
          const options = {
            maxAge: 1000 * 60 * 15, // Cookie will expire after 15 minutes
          }
          foundUser.loginAttempts = 0;
          foundUser.lockUntil = 0;
          await Auth.findByIdAndUpdate(foundUser._id, foundUser, {new : true});
          response.cookie('loginCookie', cookieData, options);
          console.log(request.cookies);
          response.status(200).send('/app');
        } else {
          foundUser.loginAttempts = foundUser.loginAttempts + 1
          await Auth.findByIdAndUpdate(foundUser._id, foundUser, {new : true});
          if (foundUser.loginAttempts > 3) {
            foundUser.lockUntil = Date.now() + (1000*60*15);
            await Auth.findByIdAndUpdate(foundUser._id, foundUser, {new : true});
            response.status(403).send('Account locked for 15 minutes. Max login attempts exceeded');
          }
          response.status(401).send('Unauthorized access')
        }
      })
    } else {
      response.status(403).send('User account locked')
    }
  }
});

router.route('/changePassword').post(async (request, response) => {
  const userAuth = request.body;
  const foundUser = await Auth.findOne({ email: userAuth.email });

  if (!foundUser || foundUser.email === 'testuser@example.com') {
    response.status(401).send('Cannot change password for testuser');
  } else {
    bcrypt.compare(userAuth.current, foundUser.password, async (err, res) => {
      if (err) {
        console.log('In error', userAuth.password, foundUser.password)
        response.send(err)
      } else if (res) {
        let passwordHash = await bcrypt.hash(userAuth.new, 10)
        foundUser.password = passwordHash;
        await Auth.findByIdAndUpdate(foundUser._id, foundUser, {new : true});
        response.send("password changed successfully")
      } else {
        console.log('In last else')
        response.status(401).send('Unauthorized User');
      }
    })
  }
});




module.exports = router;
