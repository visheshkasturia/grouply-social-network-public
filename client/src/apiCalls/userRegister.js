import axios from 'axios';
/* eslint-disable */ 
export const userRegister = async (emailID, pass, uname, fname) => {
  const data = await axios({
    method: 'post',
    url: '/api/user/register',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: emailID,
      password: pass,
      userName: uname,
      fullName: fname,
    },
  })
    .then((response) => ('Signup successful'))
    .catch((err) => ('Signup unsuccessful'));
  return data;
};

export default userRegister;
