/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDataByID } from '../../apiCalls/getUserDataByID';
import { getGroupDataByID } from '../../apiCalls/getGroupDataByID';
import getPostDataByPostId from '../../apiCalls/getPostDataByPostId';

import LeftAside from '../LeftAside/LeftAside';
import PostPageMiddle from './PostPageMiddle';
import GroupPageRightAside from '../GroupPage/GroupPageRightAside/GroupPageRightAside';

function PostPage(  ) {

  const [user, setUser] = useState('');
  const emptyGroup = {
    allPosts: []
  }
  const [group, setGroup] = useState(emptyGroup);
  const [postData, setPostData] = useState('');

  let location = useLocation();
  const pathName = location.pathname;
  let userId = pathName.split('/')[2];
  let groupId = pathName.split('/')[3];
  let postId = pathName.split('/')[4];

  useEffect(() => {
      getUserDataByID(userId).then((response) => {
        setUser(response);
      });
      getGroupDataByID(groupId).then((response) => {
        setGroup(response);
      });
      getPostDataByPostId(postId).then((res) => {
        setPostData(res);
      });

    }, []);

  return (
    <div className='App'>
      <LeftAside user={user} />
      <PostPageMiddle user={user} group={group} post={postData}/>
      <GroupPageRightAside user={user} group={group} />
    </div>
  )
}

export default PostPage
