import React, { useState, useEffect } from 'react';
import PendingMembersCard from './PendingMembersCard/PendingMembersCard';
/* eslint-disable */
function PendingMembers({ user, group }) {
  const [groupPendingList, setGroupPendingList] = useState(group.pending)

  const getChangedPendingList = (data) => {
    setGroupPendingList(data);
  } 

  useEffect(() => {
  }, [groupPendingList])
  return (
    <div>
      {
        groupPendingList.map((member, i) => (
          <PendingMembersCard key={member} getChangedPendingList={getChangedPendingList} member={member} user={user} i={i + 1} group={group} />
        ))
      }
    </div>
  )
}

export default PendingMembers;
