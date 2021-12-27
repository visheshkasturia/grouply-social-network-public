import React, { useState, useEffect } from 'react';
import AdminCard from './GroupAdminCard/GroupAdminCard';

/* eslint-disable */
function GroupAdmins({ user, group }) {
  const [groupAdminList, setGroupAdminList] = useState(group.admins)

  const getChangedAdminList = (data) => {
    setGroupAdminList(data);
  } 

  useEffect(() => {
    console.log(groupAdminList)
  }, [groupAdminList])
  return (
    <div>
      {
        groupAdminList.map((admin, i) => (
          <AdminCard key={admin} getChangedAdminList={getChangedAdminList} admin={admin} user={user} i={i + 1} group={group} />
        ))
      }
    </div>
  )
}

export default GroupAdmins;
