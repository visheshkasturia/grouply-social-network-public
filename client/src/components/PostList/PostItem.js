/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './PostItem.css';
import { faComment } from "@fortawesome/free-regular-svg-icons/faComment";
// import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom';
// import Button from '@restart/ui/esm/Button';
import deletePostById from '../../apiCalls/deletePostById';
import {Image, Video, Audio} from 'cloudinary-react';

function PostItem({post, group, updatePostInGroup}) {
  const [content, setContent] = useState(post.postContent);
  if (typeof(content) === typeof('s')) {
    if (content.includes('https://res.cloudinary.com/dawnskyfall55')) {
      let temp;
      if (post.hashTags.length > 0 && post.hashTags.includes('image')) {
        temp = (
          <Image
            style={{width: 200, height: 200}}
            cloudName='dawnskyfall55'
            publicId={content}
          />
        )
      } else if (post.hashTags.length > 0 && post.hashTags.includes('audio')) {
        temp = (
          <Audio
            style={{width: 200, height: 200}}
            cloudName='dawnskyfall55'
            publicId={content}
          />
        )
      } else if (post.hashTags.length > 0 && post.hashTags.includes('video')) {
        temp = (
          <Video
            style={{width: 250}}
            cloudName='dawnskyfall55'
            publicId={content}
          />
        )
      }
      
      setContent(temp);
    }
  }

  
  let history = useNavigate();

  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  let groupId = pathName.split('/')[3];
  let postId = post._id;
  let postURL = `/postPage/${userId}/${groupId}/${postId}`;

  const directToPostPage = (URL) => {
    history(postURL);
  }

  const handleDeletePost = () => {
    if (userId !== post.createdBy ) {
      alert("You dont have the authority to delete this post")
    }
    deletePostById(postId, group._id);
    updatePostInGroup();
    // const groupURL = `/groupPage/${userId}/${groupId}`;
    // history(groupURL);

  }

  return (
    <div className='postItem' >
      <h3 className="postItem-title"> {post.postTitle} </h3>
      <div className="postItem-content">{content}</div>
      <div className="postItem-author"> <b>Author:</b> {post.createdBy} </div>
      <div className="postItem-comment"><b><FontAwesomeIcon icon={faComment} /> &nbsp; Comments </b></div>
      <div className="postItem-flagged"> <b>Flagged:</b> {JSON.stringify(post.isFlagged[0])}</div>
      <button className="postItem-view" onClick={directToPostPage}> View Post </button>
      <button className="postItem-delete" onClick={handleDeletePost}> Delete Post </button>
    </div>

  );
}

export default PostItem;