import axios from 'axios';
/* eslint-disable */
export const deactivateAccount = async (uid) => {
  const data = await axios({
    method: 'get',
    url: `/api/user/deleteUser/${uid}`,
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

export default deactivateAccount;
