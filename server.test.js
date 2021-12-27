const request = require('supertest');
// Import MongoDB module
const { MongoClient } = require('mongodb');
// URL of db on the cloud
const url = 'mongodb+srv://viskas:Germany123@cluster0.ki4mv.mongodb.net/gtcDB?retryWrites=true&w=majority';
// Connect to our db on the cloud
const connect = async () => {
  try {
    const tmp = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // Connected to db
    console.log(`Connected to database: ${tmp.databaseName}`);
    return tmp;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const webapp = require('./server');
let db;
beforeAll(async () => {
  db = await connect();
});

const clearDatabase = async () => {
  try {
    await db.collection('users').deleteOne({ fullName: 'testuser' });
    await db.collection('posts').deleteOne({ postTitle: 'testPost' });
    await db.collection('comments').deleteOne({ commentBy: 'testUser' });
    await db.collection('groups').deleteOne({ groupName: 'testGroup' });
    
  } catch (err) {
    console.log('error', err.message);
  }
};

afterAll(async () => {
  await clearDatabase();
});

// ================= User Test =======================
describe('Testing User Controller', () => {
  // expected response
  const testUser = {
    fullName: 'testuser',
    uname: 'name',
    userName: 'name',
    email: 'test@test.com',
    password: 'hey',
    dpUrl: 'hhh',
    invitations: []
  };

  const updatedTestUser = {
    fullName: 'testuser',
    uname: 'name',
    userName: 'updated name',
    email: 'test@test.com',
    password: 'hey',
    dpUrl: 'hhh',
    invitations: []
  };

  test('user endpoint - find by Id', () => request(webapp).get('/api/user/61ab3cba29dc8216fc10c170')
    .expect(200)
    .then((response) => {
      console.log("user endpoint - find by Id | done");
    }));

  test('user endpoint - find by Id ERR', () => request(webapp).get('/api/user/xxx')
    .expect(404)
    .then((response) => {
      console.log("user endpoint - find by Id Err | done");
    }));

  test('User Registration', () => request(webapp).post('/api/user/register').send(testUser)
    .expect(201)
    .then((response) => {
      // toMatchObject check that a JavaScript object matches
      // a subset of the properties of an object
      const user = response;
      expect(user).not.toMatchObject(testUser);
      console.log('user res body', response.body, response.body._id);
      testUser._id = response.body._id;
      testUser.userID = response.body._id;
      updatedTestUser._id = testUser._id
      console.log('testUser._id??', testUser._id)
    }));
    

  //already in pending 409
  test('acceptInvite', () => request(webapp).put(`/api/user/acceptInvite/NBA`).send(testUser)
  .expect(409)
  .then((response) => {
    console.log('acceptInvite conflict | done');
}));


  //rejectInvite
  test('rejectInvite', () => request(webapp).put(`/api/user/rejectInvite/NBA`).send(testUser)
    .expect(200)
    .then((response) => {
      console.log('rejectInvite | done', response.body);
  }));


  //update
  test('User Update', () => request(webapp).put(`/api/user/update/${testUser._id}`).send(updatedTestUser)
  .expect(200)
  .then((response) => {
    console.log('testUser._id', testUser._id, `/update/${testUser._id}`);
    console.log('User Update | done', response.body);
  }));

  //delete
  test('delete user by ID', () => request(webapp).get(`/api/user/deleteUser/${testUser._id}`)
    .expect(200)
    .then(res => {
      console.log("delete user by id | done - 200", res.body);
  }));


});



// ================= Group Test =======================
describe('Testing group filter controller', () => {
  
  test('get groups by user ID', () => request(webapp).get('/api/filter/groupsByUID/61ab18b566e565d8d2cd4355')
    .expect(200)
    .then((response) => {   
      console.log("done");
    }));

  test('get groups by user ID', () => request(webapp).get('/api/filter/groupsByUID/61')
    .expect(400)
    .then((response) => {   
      console.log("done");
    }));

  test('get tags', () => request(webapp).get('/api/filter/tags/world')
    .expect(200)
    .then((response) => {
      console.log("done");
    }));

  test('get all groups', () => request(webapp).get('/api/filter/all')
    .expect(200)
    .then((response) => {
      console.log("done");
    }));

  test('get all public groups', () => request(webapp).get('/api/filter/public')
    .expect(200)
    .then((response) => {
      console.log("done");
    }));
  
  test('groups by username', () => request(webapp).get('/api/filter/groups/dwilliams')
    .expect(200)
    .then((response) => {
      console.log("done");
    }));

});

describe('Testing group controller', () => {
  const testGroup = {
    groupName: 'testGroup',
    description: 'testing',
    createdBy: '61ab2ca3e72c422d1e0d0bef',
    privacy: 0,
    admins: [],
    pending: []
  }

    // Create new group
  test('create new group', () => request(webapp).post(`/api/groups/create`).send(testGroup)
    .expect(200)
    .then(res => {
      testGroup._id = res.body._id;
      console.log("create new group | done", res.body);
  }));
  
  // Get group by GroupName
  test('get groups by GroupName', () => request(webapp).get(`/api/groups/getGroup/${testGroup.groupName}`)
    .expect(200)
    .then((response) => {   
      console.log("get groups by GroupName | done", response.body);
  }));

  // Get group by GroupID
  test('get groups by GroupID', () => request(webapp).get(`/api/groups/getGroupByID/${testGroup._id}`)
    .expect(200)
    .then((response) => {   
      console.log("get groups by GroupID | done", response.body);
  }));

    //  Add admin

    // Add member

    // Request to Join Group
    test('Request to Join Group', () => request(webapp).get(`/api/groups/joinGroup/${testGroup._id}`)
    .expect(200)
    .then((response) => {   
      console.log("Request to Join Group | done", response.body);
    }));

});

// ================= Post/Comment Test =======================
describe('Testing post filter controller', () => {

  test('get - filter post by groupId', () => request(webapp).get(`/api/postFilter/postsbyGroupId/61ab3d4f29dc8216fc10c175`)
    .expect(200)
    .then((res) => {
      console.log("get - filter post by groupId | done");
    }));

  test('get - filter post by groupId Fail', () => request(webapp).get(`/api/postFilter/postsbyGroupId/xxx`)
    .expect(400)
    .then((res) => {
      console.log("get - filter post by groupId Fail | done");
    }));
  
  test('get posts by groupName', () => request(webapp).get('/api/postFilter/postsByGroupName/NBA')
    .expect(200)
    .then((response) => {   
      console.log("done");
    }));

  test('get posts by groupName Fail', () => request(webapp).get(`/api/postFilter/postsByGroupName/invalid_group_name`)
    .expect(400)
    .then((res) => {
      console.log("get posts by groupName Fail | done");
      expect(res.text).toBe('Group not found');
    }));
    
  test('post hashtag filtering', () => request(webapp).get('/api/postFilter/hashtags/excited')
    .expect(200)
    .then((response) => {   
      console.log("done");
    }));

});


describe('Testing post & Comment Controller', () => {
  const testPost = {
    postTitle: "testPost",
    postContent: "testPost content in NBA",
    createdBy: "testUser",
    partOf: "NBA",
    hashTags: [],
    isFlagged: []
  }

  test('get a Post by postId', () => request(webapp).get(`/api/posts/getPostByID/61abe0ae11ff6493870719d3`)
    .expect(200)
    .then(res => {
      console.log("get a Post by postId | done");
    }));

  test('get a Post by postId Fail', () => request(webapp).get(`/api/posts/getPostByID/invalid_postid_xxx`)
    .expect(400)
    .then(res => {
      console.log("get a Post by postId Fail | done");
    }));

  test('flag a post for deletion', () => request(webapp).put(`/api/posts/flag/61ab18b566e565d8d2cd4355/61ab3d4f29dc8216fc10c175/61c22024bd9f29da29ed1380`)
    .expect(200)
    .then(res => {
      console.log("flag a post for deletion| done");
    }));
  
  //create new post - testpost
  test('create new post', () => request(webapp).post(`/api/posts/create`).send(testPost)
    .expect(201)
    .then(res => {
      testPost._id = res.body._id;
      console.log("create new post | done", res.body._id);
  }));

  const testComment = {
    postId: '61abe0ae11ff6493870719d3',
    userId: 'testUser',
    content: 'test comment'
  }
  const updatedTestComment = {
    postId: '61abe0ae11ff6493870719d3',
    userId: 'testUser',
    content: 'updated test comment'
  }
  // console.log('testComment', testComment);
  //create new comment for test post - test comment
  test('create new comment', () => request(webapp).post(`/api/posts/comment/create`).send(testComment)
    .expect(201)
    .then(res => {
      console.log("create new comment | done", res.body);
      testComment._id = res.body._id;
      updatedTestComment._id = testComment._id;
      console.log('testComment._id', testComment._id);
  }));

  // console.log('??? testPost._id ', testPost._id );

  test('create new comment Err', () => request(webapp).post(`/api/posts/comment/create`).send()
    .expect(400)
    .then(res => {
      console.log("create new comment Err| done", res.body);
  }));

  //get all comments of a post by postId
  test('get all commnets of a Post by postId', () => request(webapp).get(`/api/posts/comments/61abe0ae11ff6493870719d3`)
    .expect(200)
    .then(res => {
      console.log("get all comments | done");
    }));

  // test('get all commnets of a Post by postId Err', () => request(webapp).get(`/api/posts/comments/xx`)
  //   .expect(400)
  //   .then(res => {
  //     console.log("get all comments err| done");
  //   }));

  //get a comment by ID
  test('get a comment by ID', () => request(webapp).get(`/api/posts/getCommentByID/61ab18b566e565d8d2cd4355/61bba67bbf9a81bf6c691e0b`)
    .expect(200)
    .then(res => {
      console.log("get a comment | done");
  }));

  test('get a comment by ID Err', () => request(webapp).get(`/api/posts/getCommentByID/61ab18b566e565d8d2cd4355/invalid_cmt-id`)
    .expect(400)
    .then(res => {
      console.log("get a comment Err | done");
  }));

  // edit/update comment
  test('edit/update comment', () => request(webapp).put(`/api/posts/comment/edit`).send(updatedTestComment)
    .expect(200)
    .then(res => {
      console.log("edit/update comment | done");
  }));

  //delete comment - test comment
  test('delete comment', () => request(webapp).delete(`/api/posts/comment/delete/${testComment._id}`)
    .expect(200)
    .then(res => {
      console.log('??? testComment._id inside', testComment._id );
      console.log("delete comment | done");
  }));


});



