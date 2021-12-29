/* eslint-disable */
import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';


function CommentsList({comments, updateCommentInPost}) {
  const [commentChanged, setCommentChanged] = useState(false);

  function handleCommentChanged() {
    setCommentChanged(!commentChanged);
  }

  useEffect(() => {
    // setCommentChanged(!commentChanged);
  }, [commentChanged])

  

  return (
    <div>
      { comments.map((comment, i) => (
        <CommentItem key={i} comment={comment} commentChanged={commentChanged} handleCommentChanged={handleCommentChanged} updateCommentInPost={updateCommentInPost}/>
      ))}
    </div>
  );
}

export default CommentsList;