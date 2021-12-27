import axios from 'axios';
/* eslint-disable */
export const getPostDataByPostId = async (postId) => {
  const data = await axios({
    method: 'get',
    url: `/api/posts/getPostByID/${postId}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(err);
    });
  
    return data;
};

export default getPostDataByPostId;
