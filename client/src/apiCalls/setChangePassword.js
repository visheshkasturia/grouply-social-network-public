import axios from 'axios';
/* eslint-disable */
export const setChangePassword = async (input) => {
  const data = await axios({
    method: 'post',
    url: '/api/auth/changePassword',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: input.email,
      new: input.new,
      current: input.current,
    },
  })
    .then((response) => (response.data))
    .catch((err) => {
      return err.response.data
    });
  
  return data
};

export default setChangePassword;