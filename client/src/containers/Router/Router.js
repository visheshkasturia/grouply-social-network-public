import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App/App';
import Login from '../Login/Login';
import AllGroups from '../AllGroups/AllGroups';
import NotFound from '../NotFound/NotFound';
import SignUp from '../SignUp/SignUp';
import UserPage from '../UserPage/UserPage';
import MyGroups from '../MyGroups/MyGroups';
import GroupPage from '../GroupPage/GroupPage';
import PostPage from '../PostPage/PostPage';
import SuggestGroups from '../SuggestGroups/SuggestGroups';
/* eslint-disable */

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="/app" element={<App />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/allGroups/:userid" element={<AllGroups />} />
        <Route path="/user/:userid" element={<UserPage />} />
        <Route path="/myUserGroups/:userid" element={<MyGroups />} />
        <Route path="/groupPage/:userid/:groupid" element={<GroupPage />} />
        <Route path="/postPage/:userid/:groupid/:postid" element={<PostPage />} />
        <Route path="/suggestGroups/:userid" element={<SuggestGroups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
