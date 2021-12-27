import axios from 'axios';
/*eslint-disable */
export const demoteAdminInGroup = async (uNameToDemote, uid, gid) => {
  const data = await axios({
    method: 'put',
    url: `/api/groups/demoteAdmin/${gid}/${uNameToDemote}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      userID: uid,
    },
  })
    .then((response) => {
      return ({
        message: 'Success',
        res: response.data,
      })
    })
    .catch((err) => {
      return ({
        message: 'Unauthorized',
        error: err,
      });
    });
  return data;
};

export default demoteAdminInGroup;
