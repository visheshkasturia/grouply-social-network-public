import axios from 'axios';
/*eslint-disable */
export const acceptMemberFromPending = async (uNameToAccept, uid, gid) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/acceptMember/${gid}/${uNameToAccept}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      userID: uid,
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return 'Unauthorized access'
    });
  return data;
};

export default acceptMemberFromPending;
