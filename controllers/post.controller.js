const router = require('express').Router();
const Posts = require('../models/post.model');
const Groups  = require('../models/groups.model');
const Comment = require('../models/comment.model');


  // Create new post
router.route('/create').post(async (request, response) => {
    const newPostTitle = request.body.postTitle;
    const newPostContent = request.body.postContent;
    const newCreatedBy = request.body.createdBy;
    const newLikes = request.body.likes;
    const newLikedBy = request.body.likedBy;
    const newHiddenBy = request.body.hiddenBy;
    const newFlaggedBy = request.body.flaggedBy;
    const newHashTags = request.body.hashTags;
    const newAllComments = request.body.allComments;
    const newAllAttachments = request.body.allAttachments;
    const newPartOf = request.body.partOf;
    const groupPartOf = await Groups.findOne({groupName: newPartOf});

    const newPost = {
        postTitle: newPostTitle,
        postContent: newPostContent,
        partOf: newPartOf,
        createdBy: newCreatedBy,
        likes: newLikes,
        likedBy: newLikedBy,
        hiddenBy: newHiddenBy,
        flaggedBy: newFlaggedBy,
        allComments: newAllComments,
        allAttachment: newAllAttachments,
        hashTags: newHashTags,
        dateCreated: Date.now(),
    }
    const newPostObj = new Posts(newPost);
    newPostObj.save()
      .then(async (post) => {
        groupPartOf.allPosts.push(post._id);
        console.log(groupPartOf)
        await Groups.findByIdAndUpdate(groupPartOf._id, groupPartOf, {new:true})
        response.status(201).json(post)
        console.log(post);
        
      })
      .catch((err) => response.status(400).send('invalid input, object invalid' + err));
  });

//get a Post by postId
router.route('/getPostByID/:pid').get(async (request, response) => {
  console.log('getPostByID called');
  const postId = request.params.pid;
  await Posts.findById(postId)
    .then((post) => response.json(post))
    .catch(() => response.status(400).send('Error in getting group'))
});


// flag a post for deletion
router.put('/flag/:userId/:groupId/:postId', async (request, response) => {
  const postId = request.params.postId;
  const groupId = request.params.groupId;
  const userId = request.params.userId;
  // let selectedPost = await Posts.findById(postId);
  selectedGroup = await Groups.findById(groupId);
  const selectedPost = await Posts.findById(postId);
  selectedPost.isFlagged = true;
  selectedPost.flaggedBy = userId;
  response.json(selectedPost);
  await Posts.findByIdAndUpdate(postId, selectedPost);

});

// delete post by PID
/* istanbul ignore next */
router.delete('/delete/:pid', async (request, response) => {
  console.log('Delete post called');
  const postId = request.params.pid;
  const groupId = request.body.gid
  console.log(groupId)
  console.log('In delete post');
  let selectedGroup = await Groups.findById(groupId);
  console.log('selectedGroup', selectedGroup)
  if(selectedGroup.allPosts.includes(postId)) {
    const index = selectedGroup.allPosts.indexOf(postId)
    selectedGroup.allPosts.splice(index, 1)
    await Groups.findByIdAndUpdate(selectedGroup._id, selectedGroup, { new: true })
  }
  await Posts.findByIdAndDelete(postId);
  response.status(200).json(`Deleted ${postId}`);
  
})

//get a comment by ID
router.get('/getCommentByID/:pid/:cid', async (request, response) => {
  console.log('getCommentByID called');
  const postId = request.params.pid;
  const commentId = request.params.cid;
  await Comment.findById(commentId)
    .then((comment) => response.json(comment))
    .catch(() => response.status(400).send('Error in getting comment'))
});

//get all comments of a post by postId
router.get('/comments/:pid/', async (request, response) => {
  console.log('get all comments by PID called');
  const postId = request.params.pid;
  await Comment.find({postId: postId})
    .then((comment) => response.json(comment))
    .catch(() => response.status(400).send('Error in getting comments'))
});


// add a comment
router.post('/comment/create', async (request, response) => {
  console.log('Add CommentToPost called');
  const postId = request.body.postId;
  const userId = request.body.userId;
  const commentContent = request.body.content;
  const newComment = {
    postId: postId,
    commentBy: userId,
    commentContent: commentContent
  }
  const newCommentObj = new Comment(newComment);
  newCommentObj.save()
    .then(async (comment) => {
      response.status(201).json(comment)
    })
    .catch((err) => response.status(400).send('comment create failed: ' + err));
});


// Edit/Update a Comment
router.put('/comment/edit/', async (request, response) => {
  console.log('Edit Comment called');
  const commentId = request.body.commentId;
  const commentContent = request.body.content;
  const newComment = {
    commentContent: commentContent
  }
  const selectedComment = await Comment.findById(commentId);
  await Comment.findByIdAndUpdate(commentId, newComment);
  response.status(200).json(selectedComment);
  
})


//delete a comment
router.delete('/comment/delete/:commentId', async (request, response) => {
  console.log('Delete Comment called');
  const commentId = request.params.commentId;
  await Comment.findByIdAndDelete(commentId);
  response.status(200).json(`Deleted ${commentId}`);
  
});

router.get('/allPosts', (request, response) => {
  const userID = request.params.id;
  Posts.find()
    .then((res) => response.json(res))
    .catch(() => response.status(404).send('posts not found'));
});


module.exports = router;