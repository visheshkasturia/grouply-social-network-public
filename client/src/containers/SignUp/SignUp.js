import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { userRegister } from '../../apiCalls/userRegister';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    userRegister(email, password, username, fullName).then((response) => {
      setStatus(response);
    });
    setEmail('');
    setPassword('');
    setUsername('');
    setFullName('');
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e) => {
    e.preventDefault();
    setFullName(e.target.value);
  };

  return (
    <div className="Signup">
      <h2 data-testid="h2-login-test" className="h2-login">Group app signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-fullname-signup">FullName &nbsp;
          <br />
          <br />
          <input id="input-fullname-signup" value={fullName} onChange={handleFullNameChange} type="text" placeholder="Enter Full Name" required />
        </label>
        <br />
        <label htmlFor="input-username-signup">Username &nbsp;
          <br />
          <br />
          <input id="input-username-signup" value={username} onChange={handleUsernameChange} type="text" placeholder="Enter User Name" required />
        </label>
        <br />
        <label htmlFor="input-email-signup">Email &nbsp;
          <br />
          <br />
          <input id="input-email-signup" value={email} onChange={handleEmailChange} type="text" placeholder="Enter Email" required />
        </label>
        <br />
        <label htmlFor="input-password-signup">Password &nbsp;
          <br />
          <br />
          <input id="input-password-signup" type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
      <br />
      <div> {status} </div>
      <Button content="Login" redURL="/" />
    </div>
  );
}

export default SignUp;
