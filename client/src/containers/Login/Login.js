import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { userLogin } from '../../apiCalls/userLogin';
import Button from '../../components/Button/Button';
/* eslint-disable */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginReponse] = useState()
  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(email, password).then((response) => {
      if (response.data == '/app'){
        history(response.data);
      }
      setLoginReponse(response);
    })
    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="Login">
      <h2 data-testid="h2-login-test" className="h2-login">Grouply login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email-login">Email &nbsp;
          <br />
          <br />
          <input id="input-email-login" value={email} onChange={handleEmailChange} type="text" placeholder="Enter Email" required />
        </label>
        <br />
        <label htmlFor="input-password-login">Password &nbsp;
          <br />
          <br />
          <input id="input-password-login" type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" required />
        </label>
        <br />
        <button id="login-confirm" type="submit">Confirm</button>
      </form>
      <br />
      <div id="login-response">{JSON.stringify(loginResponse)}</div>
      <Button content="Sign Up" redURL='/signup' />
      <div className="test-credentials">
        To test the app without signing up, use the following credentials
        <br />
        <br />
        <b>Email: </b>testuser@example.com
        <br />
        <b>Password:</b> pass@123
      </div>

    </div>
  );
}

export default Login;
