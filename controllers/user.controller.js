const router = require('express').Router();
const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const Groups = require('../models/groups.model');

router.route('/register').post(async (request, response) => {
  console.log('Create user called')
  const newUser = new User(request.body);
  const { password } = request.body;

  const foundUser = await User.findOne({ email: newUser.email });

  if (foundUser) {
    response.status(409).send('user already exists in database');
  } else {
    Auth.createNew(newUser.email, password)
    newUser.save()
      .then((user) => response.status(201).json(user))
      .catch(() => response.status(400).send('invalid input, object invalid'));
  }
});

router.get('/:id', (request, response) => {
  const userID = request.params.id;
  User.findById(userID)
    .then((user) => response.json(user))
    .catch(() => response.status(404).send('user not found'));
});

router.put('/update/:id', async (request, response) => {
  const userID = request.params.id;

  const newData = await User.findById(userID);
  console.log('called update');
  newData.fullName = request.body.fullName
  newData.dpURL = request.body.dpURL
  newData.userName = request.body.userName
  
  User.findByIdAndUpdate(userID, newData, { new: true })
    .then((user) => (response.json(user)))
    .catch(() => response.status(404).send('user not found'));
});

router.put('/acceptInvite/:gname', async (request, response) => {
  console.log('called accept Invite');
  const gName = request.params.gname;
  const uName = request.body.uname;
  const groupData = await Groups.findOne({ groupName: gName });

  const userInPending = groupData.pending.includes(uName);
  if (!userInPending) {
    groupData.pending.push(uName);
    const userData = await User.findOne({ userName: uName });
    console.log(userData);
    const groupIndex = userData.invitations.indexOf(groupData.groupName);
    if (groupIndex > -1) {
      userData.invitations.splice(groupIndex, 1);
    }
    await Groups.findByIdAndUpdate(groupData._id, groupData, {new: true});
    User.findByIdAndUpdate(userData._id, userData, { new: true })
      .then((res) => {
        response.json(res);
      })
      .catch((err) => {
        response.status(400).send(`Something went wrong: ${err}`)
      })
  } else {
    response.status(409).send('User already in Pending')
  }
});

router.put('/rejectInvite/:gname', async (request, response) => {
  console.log('called reject Invite');
  const gName = request.params.gname;
  const uName = request.body.uname;

  const userData = await User.findOne({ userName: uName });
  console.log(userData);
  const groupIndex = userData.invitations.indexOf(gName);
  if (groupIndex > -1) {
    userData.invitations.splice(groupIndex, 1);
  }
   
  User.findByIdAndUpdate(userData._id, userData, { new: true })
    .then((res) => {
      response.json(res);
    })
    .catch((err) => {
      response.status(400).send(`Something went wrong: ${err}`)
  })
});

router.get('/deleteUser/:id', (request, response) => {
  console.log('delete user called')
  const userID = request.params.id;
  User.findByIdAndDelete(userID)
    .then(() => (response.send('/')))
    .catch(() => response.status(404).send('User not found'));
});

router.get('/account/logout', (request,response) => {
  response.clearCookie('loginCookie');
  response.send('/');
});



module.exports = router;
