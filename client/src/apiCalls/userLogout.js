/* istanbul ignore file */
import axios from 'axios';
/* eslint-disable */
export const userLogout = async () => {
  const data = await axios({
    method: 'get',
    url: '/api/user/account/logout',
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

export default userLogout;
