const router = require('express').Router();
const Group = require('../models/groups.model');
const User = require('../models/user.model')


// get all groups
router.route('/all').get(async (request, response) => {
  Group.find()
    .then((groups) => (response.status(200).json(groups)))
});

// get all Public groups
router.route('/public').get(async (request, response) => {
  Group.find({ privacy: 0 })
    .then((groups) => (response.status(200).json(groups)))
});

// filter group by member name
router.route('/groups/:uName').get(async (request, response) => {
  const uName = request.params.uName;
  let userGroups = []

  User.findOne({userName: uName})
    .then((user) => {
    let groupNames = user.memberOf;
    console.log(groupNames)
    for (let i = 0; i < groupNames.length; i++) {
      Group.findOne({groupName: groupNames[i]})
        .then((group) => {
          userGroups.push(group);
          if (i == groupNames.length - 1){
            response.send(userGroups);
          }
      });
    }
  })
  .catch((err) => response.status(400).send(`User not found`))
});

// filter group by member Id
router.route('/groupsByUID/:uid').get(async (request, response) => {
  const uid = request.params.uid;
  let userGroups = []

  User.findById(uid)
    .then(async (user) => {
    let groupNames = user.memberOf;
    console.log(groupNames)
    for (let i = 0; i < groupNames.length; i++) {
      await Group.findOne({groupName: groupNames[i]})
        .then((group) => {
          console.log('here', groupNames[i],group);
          userGroups.push(group);
          if (i == groupNames.length - 1){
            response.status(200).send(userGroups);
          }
      });
    }
  })
  .catch((err) => response.status(400).send(`User not found`))
});

// filter by tags
router.route('/tags/:tag').get(async (request, response) => {
  const tagName = request.params.tag;
  Group.find({tags: {'$in' : tagName}})
    .then((groups) => response.json(groups))
    .catch(() => response.status(400).send('Error in getting groups'))
});

// sort by date
router.route('/sort/date').get(async (request, response) => {
  Group.find({ privacy: 0}).sort({dateCreated: 1})
    .then((groups) => response.json(groups))
    .catch(() => response.status(400).send('Error in sorting'))
});

//sort alphabetically
router.route('/sort/name').get(async (request, response) => {
  Group.find({ privacy: 0 }).sort({groupName: 1})
    .then((groups) => response.json(groups))
    .catch(() => response.status(400).send('Error in sorting'))
});

module.exports = router;
