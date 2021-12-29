import axios from 'axios';
/* eslint-disable */
export const getGroupDataByID = async (groupID) => {
  const data = await axios({
    method: 'get',
    url: `/api/groups/getGroupByID/${groupID}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(err);
    });
  
    return data;
};

export default getGroupDataByID;
