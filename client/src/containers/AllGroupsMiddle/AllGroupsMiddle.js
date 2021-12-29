/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { getGroupFilter } from '../../apiCalls/getGroupFIlter';
import { getSortByDate } from '../../apiCalls/getGroupsByDate';
import { getSortByName } from '../../apiCalls/getSortAlpha';
import ExploreGroupCard from '../../components/ExploreGroupCard/ExploreGroupCard';
import './AllGroupsMiddle.css';
function AllGroupsMiddle({ groupList, getGroupData, user }) {
  const [inputs, setInputs] = useState({});
  const [tagGroup, setTagGroup] = useState([groupList]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getGroupFilter(inputs.tag)
    .then((data) => {
      setTagGroup(data);
      getGroupData(data);
      // groupList = data;
    })
  }

  const sortByDate = (e) => {
    e.preventDefault();
    getSortByDate().then((data) => {
      getGroupData(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const sortAlpha = (e) => {
    e.preventDefault();
    getSortByName().then((data) => {
      getGroupData(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="statistics-header">Filter by tag:
          <input 
            type="text" 
            name="tag" 
            value={inputs.tag || ""}
            placeholder="Search groups by tag"
            onChange={handleChange}
          />
          <button type="submit">Search</button> 
        </label>
      </form>
      <button type="button" onClick={sortByDate} id="sort-date">Sort by Date</button>
      <button type="button" onClick={sortAlpha} id="sort-alpha">Sort A-Z</button>
      <div className='middle make-flex-row'>
        {groupList.map((group) => (
          <ExploreGroupCard key={group._id} group={group} user={user} />
          ))}
      </div>
    </div>
  )
}

export default AllGroupsMiddle;
