/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getPostsbyGroupName from '../../../apiCalls/getPostsbyGroupName';
import getPostsbyGroupId from '../../../apiCalls/getPostsbyGroupId';
import PostList from '../../../components/PostList/PostList';
import './GroupPageMiddle.css';
import PopUp from '../../../components/PopUp/PopUp';
import CreatePost from '../../../components/CreatePost/CreatePost';


function GroupPageMiddle({user, group} ) {
  const [hide, setHide] = useState(false);
  const [flag, setFlag] = useState(false);
  const [originalPost, setOriginalPost] = useState([]);
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);

  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  let groupId = pathName.split('/')[3];

  useEffect(() => {

    getPostsbyGroupId(groupId).then((res) => {
      setPosts(res);
    });
    
  }, [])

  const handleCreatePost = () => {
    setCreatePost(!createPost);
  }

  const updatePostInGroup = () => {
    getPostsbyGroupId(groupId).then((res) => {
      setPosts(res);
    });
  }

  const handleHide = () => {
    if (!hide) {
      let ownPosts = [];
      setOriginalPost(posts);
      for (let i=0; i < posts.length; i++) {
        if (posts[i] !== null && posts[i].createdBy == userId) {
          ownPosts.push(posts[i]);
        }
      }
      setPosts(ownPosts);
      setHide(!hide);
    } else {
      setPosts(originalPost);
      setHide(!hide);
    }
    
  }

  const viewFlagged = () => {
    if (!flag) {
      let flaggedPosts = [];
      setOriginalPost(posts);
      for (let i=0; i < posts.length; i++) {
        if (posts[i] !== null && posts[i].isFlagged[0]) {
          flaggedPosts.push(posts[i]);
        }
      }
      setPosts(flaggedPosts);
      setFlag(!flag);
    } else {
      setPosts(originalPost);
      setFlag(!flag);
    }
    
  }
  
  return (
    <div className="middle">
      <h1 className="statistics-header"> {`Group ${group.groupName} Posts Page`} </h1> <br />
      <div className='btn-groups'>
        <button  onClick = {handleCreatePost}> Create Post </button>
        {createPost && <PopUp user={user} content = {<CreatePost user ={user} updatePostInGroup={updatePostInGroup} />} handleClose={handleCreatePost}/>}
        <button onClick={handleHide } id="hide-posts"> Toggle - Hide Others' Posts </button>
        <button onClick={viewFlagged} id="view-flagged"> Toggle - View Flagged Posts </button>
      </div> 
      <PostList posts={posts} group={group} updatePostInGroup={updatePostInGroup}/>
      <div className="message text-info">You have reached the end!</div>
    </div>
  )
}

export default GroupPageMiddle;
