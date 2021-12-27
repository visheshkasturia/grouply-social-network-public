import React from 'react';
import './UserPageMiddle.css';
/* eslint-disable */
// import CreateGroup from '../../../CreateGroup/CreateGroup'


function UserPageMiddle( {user, groupList} ) {
  return (
    <div className='middle'>
      <h1 className="statistics-header"> User Profile </h1>
      <div className="user-info-container" >
        <div className="user-info-id" >
          <b>User ID:</b> {user._id}
        </div>
        <div className="user-info-fullName" >
          <b>Full Name:</b> {user.fullName}
        </div>
        <div className="user-info-userName" >
          <b>User Name:</b> {user.userName}
        </div>
        <div className="user-info-email" >
          <b>Email:</b> {user.email}
        </div>
        <div className="user-info-groups-head" >
          <b>Groups:</b>
          <ul>
            {
              groupList.map((group) => {
                return (
                  <li> {group.groupName} </li>
                )
              })
            }
          </ul>
        </div>

      </div>
    </div>
  )
}

export default UserPageMiddle;
