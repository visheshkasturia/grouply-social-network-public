import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from '../../components/PopUp/PopUp';
import CreatePost from '../../components/CreatePost/CreatePost';
import CreateGroup from '../../components/CreateGroup/CreateGroup';
import './RightAside.css';
import { userLogout } from '../../apiCalls/userLogout';
import EditProfile from '../../components/EditProfile/EditProfile';
/* eslint-disable */
function RightAside({ user }) {
  const [createPost, setCreatePost] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  let history = useNavigate();

  const handleCreatePost = () => {
    setCreatePost(!createPost);
  }

  const handleCreateGroup = () => {
    setCreateGroup(!createGroup)
  }

  const handleEditProfile = () => {
    setEditProfile(!editProfile)
  }

  const handleLogout = () => {
    userLogout().then((response) => {
      history(response);
    })
  }

  return (
    <div className='right-aside'>
      <button  onClick = {handleCreatePost}> Create Post </button>
      {createPost && <PopUp user={user} content = {<CreatePost user ={user}/>} handleClose={handleCreatePost}/>}
      <button  onClick = {handleCreateGroup}>Create Group</button>
      {createGroup && <PopUp user={user} content = {<CreateGroup user = {user} />} handleClose={handleCreateGroup}/>}
      <button  onClick = {handleEditProfile}>Edit Profile</button>
      {editProfile && <PopUp user={user} content = {<EditProfile user = {user} />} handleClose={handleEditProfile}/>}
      <button  onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default RightAside
