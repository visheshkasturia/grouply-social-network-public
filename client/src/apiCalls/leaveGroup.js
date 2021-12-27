/* istanbul ignore file */
import axios from 'axios';
/*eslint-disable */
export const leaveGroup = async (groupID, uID) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/leave/${groupID}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      userID: uID,
    }
  })
    .then((response) => {
      return (response)
    })
    .catch((err) => {
      return (err)
    });
  return data;
};

export default leaveGroup;
