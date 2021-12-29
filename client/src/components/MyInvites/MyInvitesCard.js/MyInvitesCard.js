import React from 'react';
import { acceptGroupInvite } from '../../../apiCalls/acceptGroupInvite';
import { rejectGroupInvite } from '../../../apiCalls/rejectGroupInvite';
import './MyInvitesCard.css';
/*eslint-disable */
function MyInvitesCard({ user, invite, getChangedUser }) {
  const handleAccept = async () => {
    acceptGroupInvite(invite, user.userName)
      .then((data) => {
        getChangedUser(data.invitations);
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const handleReject = async () => {
    rejectGroupInvite(invite, user.userName)
      .then((data) => {
        getChangedUser(data.invitations);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <div className="invite-card-container">
      <div className="invite-card-groupName">
        {invite}
      </div>
      <div className="invite-card-accept">
        <button type="button" onClick={handleAccept} > Accept </button>
      </div>
      <div className="invite-card-reject">
        <button type="button" onClick={handleReject} > Reject </button>
      </div>
    </div>
  )
}

export default MyInvitesCard;
