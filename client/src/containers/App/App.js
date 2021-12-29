import React, { useState, useEffect } from 'react';
import './App.css';
/* eslint-disable */
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import LeftAside from '../LeftAside/LeftAside';
import RightAside from '../RightAside/RightAside';
import Home from '../Home/Home';

import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function App() {
  const [redirect, setRedirect] = useState(false);
  const [userID, setUserID] = useState('');
  const [user, setUser] = useState('');
  // fetch cookie if cookie is undefined send to NotFound
  useEffect(() => {
    const cookieData = Cookies.get('loginCookie');
    if (cookieData === undefined) {
      setRedirect(true);
    } else {
      // setName(JSON.parse(cookieData.slice(2)).fullName);
      setUserID(JSON.parse(cookieData.slice(2))._id);
      getUserDataByID(JSON.parse(cookieData.slice(2))._id)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => (console.log(err)))
    }
  }, []);

  return (
    <div className="App">
      {redirect && <Navigate to="/NotFound" />}
      {/* <a data-testid="logout-link-test" className="logout-link" href="http://localhost:5000/logout">Log out</a> */}
      <LeftAside user={user} />
      <Home user={user} />
      <RightAside user={user} />
    </div>
  );
}

export default App;
