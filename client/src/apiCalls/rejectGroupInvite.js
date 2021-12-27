import axios from 'axios';
/*eslint-disable */
export const rejectGroupInvite = async (gname, uName) => {
  const data = await axios({
    method: 'put',
    url: `/api/user/rejectInvite/${gname}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      uname: uName,
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => (err));
  return data;
};

export default rejectGroupInvite;
