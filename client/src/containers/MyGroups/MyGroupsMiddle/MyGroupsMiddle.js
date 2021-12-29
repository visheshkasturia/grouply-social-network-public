import React from 'react';
import MyGroupCard from '../../../components/MyGroupCard/MyGroupCard';
/* eslint-disable */
function MyGroupsMiddle({groupList, user}) {
  
  return (
    <div id="my-groups-middle" className="middle">
      <h1 className="statistics-header"> My Groups </h1>
      {groupList.map((group) => (
        <MyGroupCard key={group._id} group={group} user={user} />
        ))}
    </div>
  )
}

export default MyGroupsMiddle;
