/* eslint-disable */
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import CreateGroup from '../../components/CreateGroup/CreateGroup';
import PopUp from '../../components/PopUp/PopUp';
import MyInvites from '../../components/MyInvites/MyInvites';
import './LeftAside.css';


function LeftAside({ user }) {
  const [myInvites, setMyInvites] = useState(false);

  const handleMyInvites = () => {
    setMyInvites(!myInvites);
  }

  return (
    <div className="left-aside">
      <ProfilePicture dpURL={user.dpURL} />
      <h2 id="user-id-left" className="left-userName">@{user.userName}</h2>
      <Button content="Home" redURL={`/app`} />
      <Button content="My Profile" redURL={`/user/${user._id}`} />
      <Button content="Explore Groups" redURL={`/allGroups/${user._id}`} />
      <Button content="My Groups" redURL={`/myUserGroups/${user._id}`} />
      <button onClick ={handleMyInvites}>My Invites</button>
      {myInvites && <PopUp user={user} content = {<MyInvites user ={user}/>} handleClose={handleMyInvites}/>}
      <a href='https://chatroom-team6.herokuapp.com/' target="_blank">
        <button > Chatroom </button>
      </a>
      <Button content="Group Suggestions" redURL={`/suggestGroups/${user._id}`} />
    </div>
  )
}

export default LeftAside;
