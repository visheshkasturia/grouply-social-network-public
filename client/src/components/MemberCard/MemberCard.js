import React, { useState } from 'react';
import './MemberCard.css';
import { removeMemberFromGroup } from '../../apiCalls/removeMemberFromGroup';
import { makeAdmin } from '../../apiCalls/makeAdmin';
/* eslint-disable */

function MemberCard({ member, user, i, getChangedMemberList, group }) {
  const [status, setStatus] = useState();

  const addAdmin = () => {
    makeAdmin(user.userName, member, group._id).then ((data) => {
      if (data != 'Unauthorized access'){
        setStatus(data)
      }
    })
    return
  }

  const removeMember = () => {
    removeMemberFromGroup(member, user._id, group._id)
      .then((data) => {
        if (data != 'Unauthorized access'){
          getChangedMemberList(data.allMembers);
        }
      })
      .catch((err) => {
        console.log(err)
      });
    return
  }

  return (
    <div className="member-card-container">
      <div className="member-card-SNo flex-center"> {i} </div>
      <div className="member-card-name flex-center"> {member} </div>
      <div className="member-card-addAdmin flex-center" >
      <button type="button" onClick={addAdmin} >Make Admin</button>
      </div>
      <div className="member-card-removeMember flex-center">
      <button type="button" onClick={removeMember} >Remove Member</button>
      </div>
      <div className="add-admin-status">{status}</div>
    </div>
  )
}

export default MemberCard;
