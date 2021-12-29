/*eslint-disable */
import { useState } from "react";
import PostPosts from "../../apiCalls/PostPosts";
import { putInviteUser } from "../../apiCalls/putInviteUser";
import './InviteUser.css'

export default function InviteUser( {user, group} ) {
  const [inputs, setInputs] = useState({
    userToInvite: '',
  });
  const [status, setStatus] = useState();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    putInviteUser(group._id, inputs.userToInvite).then((response) => {
      setStatus(response);
    });
    setInputs({
      userToInvite: '',
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Username to invite:
        <input 
          type="text" 
          name="userToInvite" 
          value={inputs.userToInvite} 
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit"> Submit </button> 
      <div className="invite-status">{status}</div>
    </form>
  )
}
