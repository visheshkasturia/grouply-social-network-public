import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftAside from '../LeftAside/LeftAside';
import RightAside from '../RightAside/RightAside';
import AllGroupsMiddle from '../AllGroupsMiddle/AllGroupsMiddle';
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import { getPublicGroups } from '../../apiCalls/getPublicGroups';
/* eslint-disable */
function AllGroups() {
  const [user, setUser] = useState('');
  const [publicGroups, setPublicGroups] = useState([]);
  const getGroupData = (data) =>{
    setPublicGroups(data);
  }
  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  useEffect(() => {
      getUserDataByID(userId).then((response) => {
        setUser(response);
      });
      getPublicGroups()
        .then((groups) => {
          setPublicGroups(groups);
        })
    }, []);
  return (
    <div className="App">
      {/* {redirect && <Navigate to="/NotFound" />} */}
      {/* <a data-testid="logout-link-test" className="logout-link" href="http://localhost:5000/logout">Log out</a> */}
      <LeftAside user={user} />
      <AllGroupsMiddle groupList={publicGroups} getGroupData = {getGroupData} user={user} />
      <RightAside user={user} />
    </div>
  )
}

export default AllGroups;
