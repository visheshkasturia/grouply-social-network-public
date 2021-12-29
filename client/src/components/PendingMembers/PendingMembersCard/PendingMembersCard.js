import React from 'react';
import './PendingMembersCard.css';
import { rejectMemberFromPending } from '../../../apiCalls/rejectMemberFromPending';
import { acceptMemberFromPending } from '../../../apiCalls/acceptMemberFromPending';
/* eslint-disable */

function PendingMembersCard({ member, user, i, getChangedPendingList, group }) {

  const addMember = () => {
    acceptMemberFromPending(member, user._id, group._id)
      .then((data) => {
        if (data != 'Unauthorized access'){
          getChangedPendingList(data.pending);
        }   
      })
      .catch((err) => {
        console.log(err)
      });
    return
  }

  const rejectMember = () => {
    rejectMemberFromPending(member, user._id, group._id)
      .then((data) => {
        if (data != 'Unauthorized access'){
          getChangedPendingList(data.pending);
        }
      })
      .catch((err) => {
        console.log(err)
      });
    return
  }

  return (
    <div className="pending-card-container">
      <div className="pending-card-SNo flex-center"> {i} </div>
      <div className="pending-card-name flex-center"> {member} </div>
      <div className="pending-card-accept flex-center" >
      <button type="button" onClick={addMember} >Accept</button>
      </div>
      <div className="pending-card-reject flex-center">
      <button type="button" onClick={rejectMember} >Reject</button>
      </div>
      
    </div>
  )
}

export default PendingMembersCard;
