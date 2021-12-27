/* eslint-disable */
import axios from "axios";

export const getPostsbyGroupName = async (groupName) => {
  const data = await axios({
    method: 'get',
    url: `/api/postFilter/postsByGroupName/${groupName}`,
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

export default getPostsbyGroupName;
