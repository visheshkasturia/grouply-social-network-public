const router = require('express').Router();
const Group = require('../models/groups.model');
const Posts = require('../models/post.model');


// filter post by groupId
router.route('/postsbyGroupId/:groupId').get(async (request, response) => {
  const groupId = request.params.groupId;
  let posts = []
  Group.findById(groupId)
  .then(async (group) => {
      let postIds = group.allPosts;
      for(let i=0; i<postIds.length; i++){
        await Posts.findById(postIds[i])
          .then((post) => {
            posts.push(post);
            if (i == postIds.length - 1){
              response.send(posts);
            }
          })
          .catch((error) => (console.log(error)))
        }
    })
    .catch((err) => response.status(400).send(`User not found`))
});

// filter posts by group name
router.route('/postsByGroupName/:groupName').get(async (request, response) => {
    const groupName = request.params.groupName;
    let posts = []
    Group.findOne({groupName: groupName})
      .then((group) => {
      let postIds = group.allPosts;
      console.log(postIds)
      for (let i = 0; i < postIds.length; i++) {
        Posts.findById(postIds[i])
          .then((post) => {
            console.log(post);
            posts.push(post);
            if (i == postIds.length - 1){
              response.send(posts);
            }
        })
        .catch((error) => (console.log(error)))
      }
    })
    .catch((err) => (response.status(400).send(`Group not found`)))
  });
  

// filter by hashtags
router.route('/hashtags/:tag').get(async (request, response) => {
  const tagName = request.params.tag;
  Posts.find({hashTags: {'$in' : tagName}})
    .then((posts) => response.json(posts))
    .catch(() => response.status(400).send('Error in getting posts'))
});


module.exports = router;
