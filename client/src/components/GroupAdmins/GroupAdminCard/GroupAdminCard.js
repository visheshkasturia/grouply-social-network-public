import React from 'react';
import './GroupAdminCard.css';
import { demoteAdminInGroup } from '../../../apiCalls/demoteAdminInGroup';
/* eslint-disable */

function AdminCard({ admin, user, i, getChangedAdminList, group }) {

  const demoteAdmin = () => {
    demoteAdminInGroup(admin, user._id, group._id)
      .then((data) => {
        if (data.message == 'Success') {
          getChangedAdminList(data.res.admins);
        }
      })
      .catch((err) => {
        console.log(err)
      });
    return
  }

  return (
    <div className="admin-card-container">
      <div className="admin-card-SNo flex-center"> {i} </div>
      <div className="admin-card-name flex-center"> {admin} </div>
      <div className="admin-card-demoteAdmin flex-center">
      <button type="button" onClick={demoteAdmin}>Demote Admin</button>
      </div>  
    </div>
  )
}

export default AdminCard;
