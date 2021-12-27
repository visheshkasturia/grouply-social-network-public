import axios from 'axios';

export const PostGroups = async (input) => {
  await axios({
    method: 'post',
    url: '/api/groups/create/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      groupName: input.groupName,
      description: input.description,
      privacy: input.privacy,
      tags: [input.tags],
      createdBy: input.createdBy,
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default PostGroups;
