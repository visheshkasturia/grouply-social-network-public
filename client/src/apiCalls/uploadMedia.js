/* istanbul ignore file */
/* eslint-disable */
import axios from 'axios';

export async function uploadMedia({ type, file }) {
  const formData = new FormData();
  formData.append('upload_preset', 'bx4vunok');
  formData.append('file', file);

  const data = await axios.post(`https://api.cloudinary.com/v1_1/dawnskyfall55/${type}/upload`, formData)
  .then(res => res.data);
  return data.secure_url;
}

