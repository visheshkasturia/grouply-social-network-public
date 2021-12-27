import React, { useState, useEffect } from 'react';
import MyInvitesCard from './MyInvitesCard.js/MyInvitesCard';
/* eslint-disable */
function MyInvites({ user }) {
  const [invitationList, setInvitationList] = useState(user.invitations)

  const getChangedUser = (data) => {
    setInvitationList(data);
  } 
 
  useEffect(() => {
  }, [invitationList])

  return (
    <div className="my-invites-container">
        { invitationList.map((invite) => (
            < MyInvitesCard key={invite} user={user} invite = {invite} getChangedUser={getChangedUser} />
        ))
      }
    </div>
  )
}

export default MyInvites;
