/* istanbul ignore file */
import React from 'react';
import Button from '../Button/Button';
import './MyGroupCard.css';
/* eslint-disable */
function MyGroupCard( {group, user} ) {
  return (
    <div>
      <div className="myGroup-card-container">
      <h3 className="myGroup-card-Name">{group.groupName}</h3>
      <div className="myGroup-card-description">{group.description}</div>
      <Button className="myGroup-card-button" content="Enter" redURL={`/groupPage/${user._id}/${group._id}`} />
    </div>
    </div>
  )
}

export default MyGroupCard
