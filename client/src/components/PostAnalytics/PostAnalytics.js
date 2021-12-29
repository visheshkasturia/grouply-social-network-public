import React from 'react';
import './PostAnalytics.css';
/* eslint-disable */
function PostAnalytics({ posts, user }) {

  return (
    <div className="postAnalytics-container">
      <div className="postAnalytics-title"><b>Post Caption:</b> {posts.postTitle}</div>
      <div className ="postAnalytics-hashtags"> <b>Hashtags:</b> {posts.hashTags.map((t, i) => (
        <li key={i}>#{t}</li>
      ))} </div>
      <div className="postAnalytics-comments">
          <b>Number of Comments:</b> {posts.allComments.length}
      </div>      
    </div>
  )
}

export default PostAnalytics
