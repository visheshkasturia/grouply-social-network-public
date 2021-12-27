import axios from 'axios';
/*eslint-disable */
export const acceptGroupInvite = async (gname, uName) => {
  const data = await axios({
    method: 'put',
    url: `/api/user/acceptInvite/${gname}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      uname: uName,
    },
  })
    .then((response) => (response.data))
    .catch((err) => (err));
  
  return data;
};

export default acceptGroupInvite;
