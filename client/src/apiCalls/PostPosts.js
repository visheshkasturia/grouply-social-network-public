import axios from 'axios';

export const PostPosts = async (input) => {
  await axios({
    method: 'post',
    url: '/api/posts/create/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      postTitle: input.postTitle,
      postContent: input.postContent,
      createdBy: input.createdBy,
      hashTags: [input.hashTags],
      partOf: input.partOf,
    },
  })
    .then((response) => (response))
    .catch((err) => (err));
};

export default PostPosts;
