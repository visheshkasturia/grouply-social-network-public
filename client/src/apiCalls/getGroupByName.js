import axios from 'axios';
/* eslint-disable */
export const getGroupByName = async (gname) => {
  const data = await axios({
    method: 'get',
    url: `/api/groups/getGroup/${gname}`,
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

export default getGroupByName;
