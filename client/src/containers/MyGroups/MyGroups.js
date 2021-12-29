import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftAside from '../LeftAside/LeftAside';
import RightAside from '../RightAside/RightAside';
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import { getUserGroups } from '../../apiCalls/getUserGroups';
import MyGroupsMiddle from './MyGroupsMiddle/MyGroupsMiddle';

/* eslint-disable */
function MyGroups() {
  const [user, setUser] = useState('');
  const [myGroupDetails, setMyGroupDetails] = useState([]);
  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  useEffect(() => {
      getUserDataByID(userId).then((response) => {
        setUser(response);
      });
      getUserGroups(userId)
      .then((response) => {
        setMyGroupDetails(response);
      })
    }, []);
  return (
    <div className="App">
      {/* {redirect && <Navigate to="/NotFound" />} */}
      {/* <a data-testid="logout-link-test" className="logout-link" href="http://localhost:5000/logout">Log out</a> */}
      <LeftAside user={user} />
      <MyGroupsMiddle groupList={myGroupDetails} user={user} />
      <RightAside user={user} />
    </div>
  )
}

export default MyGroups;
