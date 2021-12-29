/* eslint-disable */
import React, { useState } from 'react';
import './CommentItem.css';
import deleteCommentByCid from '../../apiCalls/deleteCommentByCid';
import PopUp from '../PopUp/PopUp';
import EditComment from '../EditComment';

function CommentItem({comment, handleCommentChanged, updateCommentInPost}) {
  const [edit, setEdit] = useState(false);

  const handleDelete = async () => {
    await deleteCommentByCid(comment._id);
    handleCommentChanged();
    updateCommentInPost();
  }


  const handleEdit = () => {
    setEdit(!edit);
    updateCommentInPost();
  }
  
  return (
    <div className="commentItem">
      <div className="comment-content"> {comment.commentContent}</div>
      <div className="comment-author"> Author: {comment.commentBy }</div>
      <div className="comment-edit"> 
        <button onClick={handleEdit}> Edit Comment </button>
        {edit && <PopUp content = {<EditComment commentId={comment._id}/>} handleClose={handleEdit}/>}
      </div>
      <div className="comment-delete">
        <button onClick={handleDelete}> Delete Comment </button>
      </div>
    </div>
  );
}

export default CommentItem;