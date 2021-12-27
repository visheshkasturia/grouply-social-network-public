/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftAside from '../LeftAside/LeftAside';
import RightAside from '../RightAside/RightAside';
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import UserPageMiddle from './UserPageMiddle/UserPageMiddle';
import './UserPage.css';
import UserPageRightAside from './UserPageRightAside/UserPageRightAside';
import getUserGroups from '../../apiCalls/getUserGroups';

function UserPage() {
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
        <LeftAside user={user} />
        <UserPageMiddle user={user} groupList={myGroupDetails} />
        <UserPageRightAside user={user} />
      </div>
    )
  }
export default UserPage
  