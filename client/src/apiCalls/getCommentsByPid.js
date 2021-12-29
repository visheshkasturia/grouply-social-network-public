/* eslint-disable */
import axios from "axios";

export const getCommentsByPid = async (postId) => {
  const data = await axios({
    method: 'get',
    url: `/api/posts/comments/${postId}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.data
  }).catch((err) => {
    console.log(err);
  });
  return data;
}

export default getCommentsByPid;
