import React, { useState, useEffect } from 'react';
import MemberCard from '../MemberCard/MemberCard';
/* eslint-disable */
function Members({ user, group }) {
  const [groupList, setGroupList] = useState(group.allMembers)

  const getChangedMemberList = (data) => {
    setGroupList(data);
  } 

  useEffect(() => {
  }, [groupList])
  return (
    <div>
      {
        groupList.map((member, i) => (
          <MemberCard key={member} getChangedMemberList={getChangedMemberList} member={member} user={user} i={i + 1} group={group} />
        ))
      }
    </div>
  )
}

export default Members;
