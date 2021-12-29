/*eslint-disable */
import { useState } from "react";
import addComment from "../apiCalls/addComment";
import updateComment from "../apiCalls/updateComment";

export default function CreateComment( {ids, updateCommentInPost} ) {
  const [inputs, setInputs] = useState({
    postId: '',
    userId: '',
    content: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    inputs.postId = ids.postId;
    inputs.userId = ids.userId;
    await addComment(inputs);
    inputs.content ='';
    updateCommentInPost();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Comment Content:
      <input 
        type="text" 
        name="content" 
        value={inputs.content} 
        onChange={handleChange}
      />
      </label>
      <button type="submit"> Submit </button> 
    </form>
  )
}