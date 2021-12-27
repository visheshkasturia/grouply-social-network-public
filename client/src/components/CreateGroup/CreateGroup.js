/*eslint-disable */
import { useState } from "react";
import PostGroups from "../../apiCalls/PostGroups";

export default function CreateGroup( {user} ) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.createdBy = user._id;
    PostGroups(inputs);
    setInputs({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Group Name:
      <input 
        type="text" 
        name="groupName" 
        value={inputs.groupName || ""} 
        onChange={handleChange}
      />
      <br />
      </label>
      <label>Enter Group description:
      <input 
        type="text" 
        name="description" 
        value={inputs.description || ""} 
        onChange={handleChange}
      />
      </label>
      <br />
      <label>Enter Group Privacy:
        <input 
          type="text" 
          name="privacy" 
          value={inputs.privacy|| ""}
          placeholder="0 for public, 1 for private" 
          onChange={handleChange}
        />
        </label>
        <br />
        <label>Enter Group Tags:
        <input 
          type="text" 
          name="tags" 
          value={inputs.tags|| ""} 
          onChange={handleChange}
        />
        </label>
        <br />
        <button type="submit"> Submit </button> 
    </form>
  )
}

// ReactDOM.render(<MyForm />, document.getElementById('root'));