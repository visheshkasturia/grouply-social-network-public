import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deactivateAccount } from '../../../apiCalls/deactivateAccount';
import ChangePassword from '../../../components/ChangePassword/ChangePassword';
import PopUp from '../../../components/PopUp/PopUp';
/* eslint-disable */

function UserPageRightAside( {user} ) {
  const [changePassword, setChangePassword] = useState(false);
  let history = useNavigate();

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  }

  const handleDeactivateAccount = (e) => {
    e.preventDefault();
    deactivateAccount(user._id).then((response) => {
      history(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <div className="right-aside">
        <button onClick = {handleChangePassword}> Change Password </button>
        {changePassword && <PopUp user={user} content = {<ChangePassword user = {user} />} handleClose={handleChangePassword}/>}
        <button onClick = {handleDeactivateAccount}>
          Deactivate Account
        </button>
      </div>
    </div>
  )
}

export default UserPageRightAside;
