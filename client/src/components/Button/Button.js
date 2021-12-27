import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';
/* eslint-disable */
function Button( {content, redURL} ) {
  let history = useNavigate();

  const handleHistoryChange = () => {
    history(redURL);
  }

  return (
    <div className='flex-center'>
      {/* This is button of type button only for submit create new button */}
      <button  type="button" onClick={handleHistoryChange} > {content} </button> 
    </div>
  )
}

export default Button
