/* eslint-disable */
import axios from "axios";

export const deletePostById= async (postId, groupId) => {
  const data = await axios({
    method: 'delete',
    url: `/api/posts/delete/${postId}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      gid: groupId,
    },
  }).then((response) => {
    return response.data
  }).catch((err) => {
    console.log(err);
  });
  return data;
}

export default deletePostById;
