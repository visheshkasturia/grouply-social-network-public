import React from 'react';
import './GroupAnalytics.css';
/* eslint-disable */
function GroupAnalytics({ group, user }) {

  return (
    <div className="statistics-group-container">
      <div className="statistics-group-name"> <b>Group Name:</b> {group.groupName}</div>
      {/* <div className ="explore-group-description">tags:{group.tags[0]}</div> */}
      <div className ="statistics-group-tags"> 
        <b>Tags:</b>
        <ul>
        {group.tags.map((t, i) => (
          <li key={i}>{t}</li>))}
        </ul>
      </div>
      <div className="statistics-group-members"><b>Number of Members:</b> {group.allMembers.length }</div>
      <div className="statistics-group-posts"> <b>Number of Posts:</b>  {group.allPosts.length }</div>
      <div className ="statistics-group-admins"> 
        <b>Admins:</b>
        <ul>
        {group.admins.map((t, i) => (
          <li key={i}>{t}</li>))}
        </ul>
      </div>
      
    </div>
  )
}

export default GroupAnalytics
