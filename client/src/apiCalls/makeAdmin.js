import axios from 'axios';
/* eslint-disable */ 
export const makeAdmin = async (reqName, uname, gid) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/addAdmin/${uname}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      groupID: gid,
      requestedBy: reqName,
    },
  })
    .then((response) => {
      return 'Add admin successful';
    })
    .catch((err) => {
      return 'Unauthorized access'
    });
  return data;
};

export default makeAdmin;
