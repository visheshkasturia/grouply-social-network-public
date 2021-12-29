/* istanbul ignore file */
import axios from 'axios';

export const putEditProfile = async (uid, input) => {
  await axios({
    method: 'put',
    url: `/api/user/update/${uid}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      fullName: input.fullName,
      userName: input.userName,
      dpURL: input.dpURL,
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default putEditProfile;
