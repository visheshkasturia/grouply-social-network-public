/* istanbul ignore file */
/* eslint-disable */
import axios from 'axios';

export const userLogin = async (emailID, pass) => {
  const data = await axios({
    method: 'post',
    url: '/api/auth/login',
    responseType: 'json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    data: {
      email: emailID,
      password: pass,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      let x = '';
      if (err.response.status === 403) {
        x = 'Account locked';
      } else {
        x = 'Login Failed';
      }
      return x;
    });
  return data;
};

export default userLogin;
