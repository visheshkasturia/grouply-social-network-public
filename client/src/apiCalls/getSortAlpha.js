/* istanbul ignore file */
import axios from 'axios';
/* eslint-disable */
export const getSortByName = async (gname) => {
  const data = await axios({
    method: 'get',
    url: `/api/filter/sort/name`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => (response.data))
    .catch((err) => {
      return []
    });
    return data;
};

export default getSortByName;
