/* istanbul ignore file */
import axios from 'axios';
/* eslint-disable */
export const getSortByDate = async (gname) => {
  const data = await axios({
    method: 'get',
    url: `/api/filter/sort/date`,
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

export default getSortByDate;
