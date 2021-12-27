/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

function PostList({posts, group, updatePostInGroup}) {

  return (
    <div>
      {  posts.map( post => (
        (post !== null && <PostItem key={post._id} post={post} group={group} updatePostInGroup={updatePostInGroup} /> )
      )
      )}
    </div>
  );
}

export default PostList;