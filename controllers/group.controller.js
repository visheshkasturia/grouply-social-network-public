const router = require('express').Router();
const Group = require('../models/groups.model');
const User = require('../models/user.model')


// Create new group
router.route('/create').post(async (request, response) => {
  const newGroupName = request.body.groupName;
  const newGroupDesc = request.body.description;
  const newGroupPrivacy = parseInt(request.body.privacy);
  const newGroupTags = request.body.tags

  const newGroupAdmin = request.body.createdBy

  const foundGroup = await Group.findOne({ groupName: newGroupName });

  const adminUser = await User.findById(newGroupAdmin)

  if (foundGroup) {
    response.status(409).send('Groupname already exists in database, choose other name');
  } else {
    const newGroup = {
      groupName: newGroupName,
      description: newGroupDesc,
      privacy: newGroupPrivacy,
      createdBy: newGroupAdmin,
      allMembers: [adminUser.userName],
      allPosts: [],
      admins: [adminUser.userName],
      pending: [],
      tags: newGroupTags,
      dateCreated: Date.now(),
    }

    const newGroupObj = new Group(newGroup);

    newGroupObj.save()
      .then(async (group) => {
        adminUser.memberOf.push(group.groupName)
        await User.findByIdAndUpdate(adminUser._id, adminUser, { new: true })
        console.log(group)
        response.json(group)
      })
      .catch((err) => response.status(400).send('invalid input, object invalid' + err));
  }
});


//  Add admin
/* istanbul ignore next */
router.put('/addAdmin/:uname', async (request, response) => {
  console.log('addAdmin called')
  const newAdminName = request.params.uname;

  const groupID = request.body.groupID
  const requestedBy = request.body.requestedBy
  const user = await User.findOne({userName: newAdminName})

  let selectedGroup = await Group.findById(groupID)


  const reqIsAdmin = selectedGroup.admins.includes(requestedBy) || selectedGroup.createdBy === requestedBy
  const userAlreadyAdmin = selectedGroup.admins.includes(user.userName)
  const userIsMember = selectedGroup.allMembers.includes(user.userName)
  console.log('in if')
  if (reqIsAdmin && !userAlreadyAdmin && userIsMember) {
    console.log('in if')
    selectedGroup.admins.push(user.userName)
    Group.findByIdAndUpdate(groupID, selectedGroup, { new: true })
    .then((group) => (response.json(group)))
    .catch(() => response.status(404).send('something went wrong when updating')); 
  }
  else
  {
    response.status(401).send("You are not an admin or user is already an admin")
  }
});


// Add member
/* istanbul ignore next */
router.put('/addMember/:uname', async (request, response) => {
  const newMemberName = request.params.uname;

  const groupID = request.body.groupID
  const requestedBy = request.body.requestedBy
  const user = await User.findOne({userName: newMemberName})

  let selectedGroup = await Group.findById(groupID)


  const reqIsAdmin = selectedGroup.admins.includes(requestedBy) || selectedGroup.createdBy === requestedBy
  const userAlreadyMember = selectedGroup.allMembers.includes(user.userName)

  if (reqIsAdmin && !userAlreadyMember) {
    selectedGroup.allMembers.push(user.userName)
    Group.findByIdAndUpdate(groupID, selectedGroup, { new: true })
    .then(async (group) => {
      user.memberOf.push(selectedGroup.groupName)
      await User.findByIdAndUpdate(user._id, user, { new: true })
      response.json(group)
    })
    .catch(() => response.status(404).send('something went wrong when updating')); 
  }
  else
  {
    response.status(401).send("You are not an admin or user is already a member")
  }
});


// Request to Join Group
/* istanbul ignore next */
router.put('/joinGroup/:gid', async (request, response) => {
  const groupID = request.params.gid;
  const userID = request.body.userID

  const user = await User.findById(userID)

  let selectedGroup = await Group.findById(groupID)

  const userAlreadyMember = selectedGroup.allMembers.includes(user.userName)
  const userAlreadyRequested = selectedGroup.pending.includes(user.userName)

  if (!userAlreadyMember && !userAlreadyRequested) {
    selectedGroup.pending.push(user.userName)
    Group.findByIdAndUpdate(groupID, selectedGroup, { new: true })
    .then((group) => (response.json(group)))
    .catch(() => response.status(404).send('something went wrong when updating')); 
  }
  else
  {
    response.status(409).send("Already a member or Already requested")
  }
})

// Invite to join a group
/* istanbul ignore next */
router.put('/invite/:gid/:uname', async (request, response) => {
  const groupID = request.params.gid;
  const uName = request.params.uname;
  console.log('invite user called')
  const selectedGroup = await Group.findById(groupID);

  let user = await User.findOne({userName: uName})

  const userAlreadyMember = selectedGroup.allMembers.includes(user.userName)
  const userAlreadyInvited = user.invitations.includes(selectedGroup.groupName);

  if (!userAlreadyMember && !userAlreadyInvited) {
    user.invitations.push(selectedGroup.groupName)
    User.findByIdAndUpdate(user._id, user, { new: true })
    .then((group) => (response.json(group)))
    .catch(() => response.status(404).send('something went wrong when updating')); 
  }
  else
  {
    response.status(409).send('Already a member or already invited')
  }
})


// Leave a group
/* istanbul ignore next */
router.put('/leave/:gid', async (request, response) => {
  const groupID = request.params.gid;
  const userID = request.body.userID
  
  let selectedGroup = await Group.findById(groupID);

  let user = await User.findById(userID);

  if(selectedGroup.allMembers.includes(user.userName)){
    const index = selectedGroup.allMembers.indexOf(user.userName)
    selectedGroup.allMembers.splice(index, 1)
    await Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
  }

  if(selectedGroup.admins.includes(user.userName)){
    const index = selectedGroup.admins.indexOf(user.userName)
    selectedGroup.admins.splice(index, 1)
    await Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
  }

  const memberOf = user.memberOf.includes(selectedGroup.groupName)

  if (memberOf) {
    const index = user.memberOf.indexOf(selectedGroup.groupName)
    user.memberOf.splice(index, 1)
    User.findByIdAndUpdate(user._id, user, { new: true })
    .then((group) => (response.json(group)))
    .catch(() => response.status(404).send('something went wrong when updating')); 
  }
  else
  {
    response.status(409).send('Not a member')
  }
})

// Remove Member From Group
/* istanbul ignore next */
router.put('/removeMember/:gid/:uname', async (request, response) => {
  console.log('Remove Member Called')
  const groupID = request.params.gid;
  const uNameToRemove = request.params.uname
  const reqUserID = request.body.userID
  
  let selectedGroup = await Group.findById(groupID);
  let userToRemove = await User.findOne({ userName: uNameToRemove });
  let requestingUser = await User.findById(reqUserID);

  const isAdmin = selectedGroup.admins.includes(requestingUser.userName) || selectedGroup.createdBy === requestedBy;

  const memberOf = userToRemove.memberOf.includes(selectedGroup.groupName)

  if (isAdmin) {
    if (memberOf) {
      const index = userToRemove.memberOf.indexOf(selectedGroup.groupName)
      userToRemove.memberOf.splice(index, 1)
      await User.findByIdAndUpdate(userToRemove._id, userToRemove, { new: true })
    }

    if(selectedGroup.admins.includes(userToRemove.userName)){
      const index = selectedGroup.admins.indexOf(userToRemove.userName)
      selectedGroup.admins.splice(index, 1)
      await Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
    }
  
    if(selectedGroup.allMembers.includes(userToRemove.userName)){
      const index = selectedGroup.allMembers.indexOf(userToRemove.userName)
      selectedGroup.allMembers.splice(index, 1)
      Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
        .then ((res) => response.json(res))
        .catch((err) => response.status(404).send('Error while Removing' + err))
    }
  }
  else {
    response.status(401).send('Unauthorized access')
  }

})

// Demote Admin in Group
/* istanbul ignore next */
router.put('/demoteAdmin/:gid/:aname', async (request, response) => {
  console.log('Demote Admin Called')
  const groupID = request.params.gid;
  const aNameToDemote = request.params.aname
  const reqUserID = request.body.userID
  
  let selectedGroup = await Group.findById(groupID);
  let adminToDemote = await User.findOne({ userName: aNameToDemote });
  let requestingUser = await User.findById(reqUserID);

  const isAdmin = selectedGroup.admins.includes(requestingUser.userName);
  const demotedIsNotCreator = selectedGroup.createdBy != aNameToDemote;

  if (isAdmin && demotedIsNotCreator) {

    if(selectedGroup.admins.includes(adminToDemote.userName)){
      const index = selectedGroup.admins.indexOf(adminToDemote.userName)
      selectedGroup.admins.splice(index, 1)
      Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
        .then ((res) => response.json(res))
        .catch((err) => response.status(404).send('Error while Removing' + err))
    }
  }
  else {
    response.status(401).send('Unauthorized access')
  }

})

// Reject Member from pending
/* istanbul ignore next */
router.put('/rejectMember/:gid/:uname', async (request, response) => {
  console.log('Reject Member Called')
  const groupID = request.params.gid;
  const uNameToReject = request.params.uname
  const reqUserID = request.body.userID
  
  let selectedGroup = await Group.findById(groupID);
  let userToReject = await User.findOne({ userName: uNameToReject });
  let requestingUser = await User.findById(reqUserID);

  const isAdmin = selectedGroup.admins.includes(requestingUser.userName);
  
  console.log(isAdmin)
  if (isAdmin) {

    if(selectedGroup.pending.includes(userToReject.userName)){
      const index = selectedGroup.pending.indexOf(userToReject.userName)
      selectedGroup.pending.splice(index, 1)
      Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
        .then ((res) => response.json(res))
        .catch((err) => response.status(404).send('Error while Removing' + err))
    }
  }
  else {
    response.status(401).send('Unauthorized access')
  }

})

// Accept Member from pending
/* istanbul ignore next */
router.put('/acceptMember/:gid/:uname', async (request, response) => {
  console.log('Accept Member Called')
  const groupID = request.params.gid;
  const uNameToAccept = request.params.uname
  const reqUserID = request.body.userID
  
  let selectedGroup = await Group.findById(groupID);
  let userToAccept = await User.findOne({ userName: uNameToAccept });
  let requestingUser = await User.findById(reqUserID);

  const isAdmin = selectedGroup.admins.includes(requestingUser.userName);
  const memberOf = userToAccept.memberOf.includes(selectedGroup.groupName)
  console.log(isAdmin)
  if (isAdmin && !(memberOf)) {
    userToAccept.memberOf.push(selectedGroup.groupName)
    selectedGroup.allMembers.push(userToAccept.userName)
    
    await User.findByIdAndUpdate(userToAccept._id, userToAccept, {new:true})
    if(selectedGroup.pending.includes(userToAccept.userName)){
      const index = selectedGroup.pending.indexOf(userToAccept.userName)
      selectedGroup.pending.splice(index, 1)
      Group.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
        .then ((res) => response.json(res))
        .catch((err) => response.status(404).send('Error while Removing' + err))
    }
  }
  else {
    response.status(401).send('Unauthorized access')
  }

})


// Get group by GroupName

router.route('/getGroup/:gname').get(async (request, response) => {
  const gName = request.params.gname;
  Group.findOne({ groupName: gName})
    .then((group) => response.json(group))
    .catch(() => response.status(400).send('Error in getting group'))
});

// Get group by GroupID

router.route('/getGroupByID/:gid').get(async (request, response) => {
  console.log('GetGroupByID called');
  const groupID = request.params.gid;
  Group.findById(groupID)
    .then((group) => response.json(group))
    .catch(() => response.status(400).send('Error in getting group'))
});



module.exports = router;