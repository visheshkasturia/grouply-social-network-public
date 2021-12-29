/* eslint-disable */
import axios from "axios";

export const getPostsbyGroupId = async (groupId) => {
  const data = await axios({
    method: 'get',
    url: `/api/postFilter/postsByGroupId/${groupId}`,
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

export default getPostsbyGroupId;
