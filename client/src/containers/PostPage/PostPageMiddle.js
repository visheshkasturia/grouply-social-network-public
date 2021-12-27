/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import getPostDataByPostId from '../../apiCalls/getPostDataByPostId';
import getCommentsByPid from '../../apiCalls/getCommentsByPid';
import CommentsList from '../../components/CommentsList/CommentsList';
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopUp from '../../components/PopUp/PopUp';
import CreateComment from '../../components/CreateComment';
import flagPutPost from '../../apiCalls/flagPutPost';
import {Image, Video, Audio} from 'cloudinary-react';
import './PostPageMiddle.css'

function PostPageMiddle({ post } ) {
  const [content, setContent] = useState();

  const [userData, setUserData] = useState('');
  const emptyGroup = {
    allPosts: []
  }
  // const [groupData, setGroupData] = useState(emptyGroup);
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);

  let history = useNavigate();
  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  let groupId = pathName.split('/')[3];
  let postId = pathName.split('/')[4];

  const ids = {
    postId: postId,
    userId: userId,
    groupId: groupId
  }

  useEffect(() => {
    getCommentsByPid(postId).then((res) => {
      setComments(res);
    });

  }, []);

  const handleAddComment = () => {
    setAddComment(!addComment);
  }

  const updateCommentInPost = () => {
    getCommentsByPid(postId).then((res) => {
      setComments(res);
    });
  }

  const handleFlag = () => {
    flagPutPost(ids);
  }


  

  return (
    <div className="middle">
      <h1 className="statistics-header"> {`Group - Post Page for ${post.postTitle}`} </h1> <br />
      <div className="postHeader">
        <h3 className="postHeader-title"> {post.postTitle} </h3>
        <a href={post.postContent}> </a> 
        <div className="postHeader-content"> 
        <a href={post.postContent}> </a> 
        {
          (post.postContent && post.postContent.includes('https://res.cloudinary.com')) ?
          <a href={post.postContent}> {post.postContent} </a> :
          post.postContent
        } 
        </div>
        <div className="postHeader-author"><b>Author:</b>{post.createdBy}</div>
        <div className="postHeader-comment"><b><FontAwesomeIcon icon={faComment} /> Comments:</b>{comments.length} </div>
        <div className="postHeader-flagged"> <b>Flagged:</b> {post.isFlagged && JSON.stringify(post.isFlagged[0])}</div>       
        <div className="postHeader-addComment"> 
          <button onClick={handleAddComment}> Add a Comment </button>
          {addComment && <PopUp content = {<CreateComment ids ={ids} updateCommentInPost={updateCommentInPost} />} handleClose={handleAddComment}/>}
        </div>
        <div className="postHeader-flagPost"> 
        <button onClick={handleFlag}> Flag Post </button>
        </div>
      </div>  

      <h3> View Post Comments </h3>
      <CommentsList comments={comments} updateCommentInPost={updateCommentInPost} />

      <br/> <div className="message text-info">You have reached the end!</div>
    </div>
  )
}

export default PostPageMiddle;
