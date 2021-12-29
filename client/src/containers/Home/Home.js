import React, { useState, useEffect } from 'react';
import './Middle.css';

import GroupAnalytics from '../../components/GroupAnalytics/GroupAnalytics';
import { getPublicGroups } from '../../apiCalls/getPublicGroups';
import { getAllposts } from '../../apiCalls/getAllposts';
import PostAnalytics from '../../components/PostAnalytics/PostAnalytics';
/*eslint-disable */

function Home({ user }) {
  const [publicGroups, setPublicGroups] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPublicGroups()
      .then((groups) => {
        setPublicGroups(groups);
      })
  }, []);
  useEffect(() => {
    getAllposts()
      .then((posts) => {
        setPosts(posts);
      })
  }, []);

  return (
    <div className="middle">
      <h1 id="group-stat-head" className="statistics-header"> Group Statistics </h1>
        <div className = "center">
        {publicGroups.map((group) => (
            <GroupAnalytics key={group._id} group={group} user={user} />
            ))}
        </div>
      <h1 className="statistics-header"> Post Analytics </h1>
        <div className = "center">
        {posts.map((post) => (
            <PostAnalytics key={post._id} posts={post} user={user} />
            ))}
        </div>
    </div>

  )
}

export default Home;
