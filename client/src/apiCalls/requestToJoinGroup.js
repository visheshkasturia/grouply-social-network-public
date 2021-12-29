import axios from 'axios';
/* eslint-disable */
export const requestToJoinGroup = async (groupID, userid) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/joinGroup/${groupID}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      userID: userid,
    },
  })
    .then(() => {
      return 'Request successful';
    })
    .catch(() => {
      return 'Error in requesting'
    });
  
  return data;
};

export default requestToJoinGroup;
