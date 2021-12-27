/* eslint-disable */
import axios from "axios";

export const deleteCommentByCid = async (commentId) => {
  const data = await axios({
    method: 'delete',
    url: `/api/posts/comment/delete/${commentId}`,
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

export default deleteCommentByCid;
