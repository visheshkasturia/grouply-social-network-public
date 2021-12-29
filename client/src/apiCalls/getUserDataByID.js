import axios from 'axios';
/* eslint-disable */
export const getUserDataByID = async (userID) => {
  const data = await axios({
    method: 'get',
    url: `/api/user/${userID}`,
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

export default getUserDataByID;
