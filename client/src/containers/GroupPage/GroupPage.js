import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import { getGroupDataByID } from '../../apiCalls/getGroupDataByID';
/* eslint-disable */
import LeftAside from '../LeftAside/LeftAside'
import GroupPageMiddle from './GroupPageMiddle/GroupPageMiddle'
import GroupPageRightAside from './GroupPageRightAside/GroupPageRightAside'

function GroupPage(  ) {
  //  to do get user data here
  const [user, setUser] = useState('');
  const emptyGroup = {
    allPosts: []
  }
  const [group, setGroup] = useState(emptyGroup);

  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  let groupId = pathName.split('/')[3];
  useEffect(() => {
      getUserDataByID(userId).then((response) => {
        setUser(response);
      });
      getGroupDataByID(groupId).then((response) => {
        setGroup(response);
        // setPosts(response.allPosts)
      })

    }, []);


  return (
    <div className='App'>
      <LeftAside user={user} />
      <GroupPageMiddle user={user} group={group} />
      <GroupPageRightAside user={user} group={group}  />
    </div>
  )
}

export default GroupPage
