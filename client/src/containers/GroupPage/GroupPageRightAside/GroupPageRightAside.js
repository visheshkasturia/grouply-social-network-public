import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from '../../../components/PopUp/PopUp';
// import CreatePost from '../../../components/CreatePost/CreatePost';
import Members from '../../../components/Members/Members';
import GroupAdmins from '../../../components/GroupAdmins/GroupAdmins';
import PendingMembers from '../../../components/PendingMembers/PendingMembers';
import InviteUser from '../../../components/InviteUser/InviteUser';
import { leaveGroup } from '../../../apiCalls/leaveGroup';
/* eslint-disable */

function GroupPageRightAside({ group, user }) {
  // const [createPost, setCreatePost] = useState(false);
  const [handleInvite,setHandleInvite] = useState(false);
  const [viewAllMembers, setViewAllMembers] = useState(false);
  const [viewAllAdmins, setViewAllAdmins] = useState(false);
  const [viewPendingMembers, setViewPendingMembers] = useState(false);
  
  console.log('group in right aside', group)
  let history = useNavigate();

  // const handleCreatePost = () => {
  //   setCreatePost(!createPost);
  // }

  const handleInviteButton = () => {
    setHandleInvite(!handleInvite);
  }

  const handleViewAllMembers = () => {
    setViewAllMembers(!viewAllMembers);
  }

  const handleViewAllAdmins = () => {
    setViewAllAdmins(!viewAllAdmins);
  }

  const handlePendingMembers = () => {
    setViewPendingMembers(!viewPendingMembers);
  }

  const handleLeaveGroup = () => {
    leaveGroup(group._id,user._id)
    history('/app');
  }

  return (
    <div className="right-aside">
      {/* <button  onClick = {handleCreatePost}> Create Post </button> */}
      <button onClick ={handleInviteButton}> Invite User in a group </button>
      <button onClick ={handleViewAllMembers}> View All Members </button>
      <button onClick ={handleViewAllAdmins}> View All Admins </button>
      <button onClick ={handlePendingMembers}> Pending Members </button>
      <button onClick ={handleLeaveGroup}> Leave Group </button>
      {/* {createPost && <PopUp user={user} content = {<CreatePost user ={user} />} handleClose={handleCreatePost}/>} */}
      {viewAllMembers && <PopUp user={user} content = {<Members user ={user} group={group}/>} handleClose={handleViewAllMembers}/>}
      {viewAllAdmins && <PopUp user={user} content = {<GroupAdmins user ={user} group={group}/>} handleClose={handleViewAllAdmins}/>}
      {handleInvite && <PopUp user={user} content = {<InviteUser user ={user} group={group} />} handleClose={handleInviteButton}/>}
      {viewPendingMembers && <PopUp user={user} content = {<PendingMembers user ={user} group={group} />} handleClose={handlePendingMembers}/>}
      
    </div>
  )
}

export default GroupPageRightAside
