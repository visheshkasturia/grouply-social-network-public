import axios from 'axios';
/* eslint-disable */
export const getPublicGroups = async (userID) => {
  const data = await axios({
    method: 'get',
    url: '/api/filter/public',
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

export default getPublicGroups;
