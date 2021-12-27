import axios from 'axios';
/* eslint-disable */
export const getAllposts = async (gname) => {
  const data = await axios({
    method: 'get',
    url: `/api/posts/allPosts`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => (response.data))
    .catch((err) => {
      console.log(err);
    });
    return data;
};

export default getAllposts;
