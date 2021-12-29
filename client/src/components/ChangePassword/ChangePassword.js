/*eslint-disable */
import { useState } from "react";
import { setChangePassword } from "../../apiCalls/setChangePassword";

export default function ChangePassword( {user} ) {
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.createdBy = user._id;
    inputs.email = user.email;
    setChangePassword(inputs).then((response) => {
      setStatus(response);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Current Password:
        <input 
          type="password" 
          name="current" 
          value={inputs.current || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter New Password:
        <input 
          type="password" 
          name="new" 
          value={inputs.new || ""} 
          onChange={handleChange}
        />
        </label>
          <button type="submit"> Change Password </button>
      </form>
      <div> {status} </div>
    </div>
  )
}