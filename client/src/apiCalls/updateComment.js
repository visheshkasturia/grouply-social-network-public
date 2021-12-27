import axios from 'axios';

export const updateComment = async (input) => {
  await axios({
    method: 'put',
    url: '/api/posts/comment/edit',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      commentId: input.commentId,
      content: input.content,
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default updateComment;
