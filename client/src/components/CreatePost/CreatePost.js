/*eslint-disable */
/* istanbul ignore file */
import { useState } from "react";
import PostPosts from "../../apiCalls/PostPosts";
import { uploadMedia } from "../../apiCalls/uploadMedia";

export default function CreatePost( {user, updatePostInGroup} ) {
  const [mediaURL, setMediaURL] = useState('');
  const [inputs, setInputs] = useState({
    postTitle: '',
    postContent: '',
    hashTags: '',
    partOf: '',
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    inputs.createdBy = user._id;
    if (mediaURL !== '') {
      inputs.postContent = mediaURL;
    }
    await PostPosts(inputs);
    setInputs({
      postTitle: '',
      postContent: '',
      hashTags: '',
      partOf: '',
    });
    setMediaURL('')
    updatePostInGroup();
  }

  async function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      const imageURL = await uploadMedia({
        type: 'image',
        file
      });
      setMediaURL(imageURL);
    }
  }

  async function uploadVideo(event) {
    const file = event.target.files[0];
    if (file) {
      const videoURL = await uploadMedia({
        type: 'video',
        file
      });
      setMediaURL(videoURL);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Post Title:
      <input 
        type="text" 
        name="postTitle" 
        value={inputs.postTitle} 
        onChange={handleChange}
      />
      </label>
      <label>Enter Post Content:
      <textarea 
        rows="5"
        cols="40"
        name="postContent" 
        value={inputs.postContent } 
        onChange={handleChange}
      />
      </label>
     <label>Enter Post hashtags:
        <input 
          type="text" 
          name="hashTags" 
          value={inputs.hashTags} 
          onChange={handleChange}
        />
     </label>
     <label>Enter Group Name you want to Post in:
        <input 
          type="text" 
          name="partOf" 
          value={inputs.partOf} 
          onChange={handleChange}
        />
     </label>

     <label> Upload Image </label>
     <input 
      type='file'
      onChange={uploadImage}
      id='imageUpload'
      />
     
    <label> Upload Audio/Video </label>
    <input 
      type='file'
      onChange={uploadVideo}
      id='VideoUpload'
    />

      <br/> 
      <button type="submit"> Submit </button>
    </form>
  )
}