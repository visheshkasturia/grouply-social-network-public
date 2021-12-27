import axios from 'axios';

export const addComment = async (input) => {
  await axios({
    method: 'post',
    url: '/api/posts/comment/create',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      postId: input.postId,
      userId: input.userId,
      content: input.content,
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default addComment;
