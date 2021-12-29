import axios from 'axios';
/* eslint-disable */
export const getUserGroups = async (uid) => {
  const data = await axios({
    method: 'get',
    url: `/api/filter/groupsByUID/${uid}`,
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

export default getUserGroups;
