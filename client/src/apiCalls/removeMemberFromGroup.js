import axios from 'axios';
/*eslint-disable */
export const removeMemberFromGroup = async (uNameToRemove, uid, gid) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/removeMember/${gid}/${uNameToRemove}`,
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

export default removeMemberFromGroup;
