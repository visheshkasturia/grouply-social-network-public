import axios from 'axios';
/* eslint-disable */
export const getGroupFilter = async (input) => {
  const data = await axios({
    method: 'get',
    url: `/api/filter/tags/${input}`,
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

export default getGroupFilter;