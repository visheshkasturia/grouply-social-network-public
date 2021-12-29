import React, { useState } from 'react';
import { requestToJoinGroup } from '../../apiCalls/requestToJoinGroup';
import './ExploreGroupsCard.css';
/* eslint-disable */
function ExploreGroupCard({ group, user }) {
  const [status, setStatus] = useState();

  const handleJoinGroup = () => {
    requestToJoinGroup(group._id, user._id).then((data) => {
      setStatus(data)
    })
  }

  return (
    <div className="explore-card-container">
      <h3 className="explore-group-Name">{group.groupName}</h3>
      <div className="explore-group-description">{group.description}</div>
      {/* <div className ="explore-group-description">tags:{group.tags[0]}</div> */}
      {/* <div className ="explore-group-description"> tags: {group.tags.map((t) => (
        <li>{t}</li>
      ))}
      </div> */}
      <button type="button" onClick={handleJoinGroup}> Request to Join </button>
      <div>{status}</div>
    </div>
  )
}

export default ExploreGroupCard
