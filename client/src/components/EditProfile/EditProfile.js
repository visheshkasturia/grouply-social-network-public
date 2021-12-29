/*eslint-disable */
import { useState } from "react";
import { putEditProfile } from "../../apiCalls/putEditProfile";

export default function EditProfile( {user} ) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    putEditProfile(user._id,inputs);
    setInputs({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Full Name:
      <input 
        type="text" 
        name="fullName" 
        value={inputs.fullName || ""} 
        onChange={handleChange}
      />
      <br />
      </label>
      <label>Enter Username:
      <input 
        type="text" 
        name="userName" 
        value={inputs.userName || ""} 
        onChange={handleChange}
      />
      </label>
      <br />
      <label>Enter Profile Picture URL:
        <input 
          type="text" 
          name="dpURL" 
          value={inputs.dpURL|| ""}
          onChange={handleChange}
        />
        </label>
        <br />
        <button type="submit"> Submit </button> 
    </form>
  )
}
