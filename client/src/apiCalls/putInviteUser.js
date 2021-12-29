import axios from 'axios';
/*eslint-disable */
export const putInviteUser = async (groupID, uName) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/invite/${groupID}/${uName}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return 'User Invited'
    })
    .catch((err) => {
      return 'Error in Inviting User'
    });
  return data;
};

export default putInviteUser;
