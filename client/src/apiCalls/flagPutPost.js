import axios from 'axios';

export const flagPutPost = async (input) => {
  await axios({
    method: 'put',
    url: `/api/posts/flag/${input.userId}/${input.groupId}/${input.postId}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default flagPutPost;
