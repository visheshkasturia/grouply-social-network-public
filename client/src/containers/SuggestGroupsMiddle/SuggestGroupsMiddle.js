/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ExploreGroupCard from '../../components/ExploreGroupCard/ExploreGroupCard';
import './SuggestGroupsMiddle.css';
function SuggestGroupsMiddle({ groupList, getGroupData, user }) {
  return (
      <div className='middle'>
        <h1 className="statistics-header">Group Suggestions:</h1>
        <div className="suggest-groups-container">
        {groupList.slice(3).map((group) => (
          <ExploreGroupCard key={group._id} group={group} user={user} />
          ))}
        </div>
    </div>
  )
}
export default SuggestGroupsMiddle;