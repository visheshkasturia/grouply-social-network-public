import React from 'react';
import './ProfilePicture.css';
/* eslint-disable */

function ProfilePicture({ dpURL }) {
  return (
    <div>
      <img className='profile-img' src={dpURL} alt="Profile DP"/>
    </div>
  )
}

export default ProfilePicture;
