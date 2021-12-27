/*eslint-disable */
import { useState } from "react";
import updateComment from "../apiCalls/updateComment";

export default function EditComment( {commentId} ) {
  const [inputs, setInputs] = useState({
    commentId: '',
    content: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.commentId = commentId;
    updateComment(inputs);
    inputs.content ='';
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Input New Comment Content:
      <input 
        type="text" 
        name="content" 
        value={inputs.content} 
        onChange={handleChange}
      />
      </label>
      <input type="submit" />
    </form>
  )
}