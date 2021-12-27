import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemberCard from '../MemberCard'

const admin = 'abc'
const member = 'test1'
const post = '1'
const tag = 'tag'
const group = {
  groupName: "test",
  description: "desc",
  admins: [admin],
  allMembers: [member],
  allPosts: [post],
  tags: [tag]
}

it('MemberCard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemberCard member={member} group={group} />, div);
});

it('MemberCard matches snapshot', () => {
  const tree = renderer.create(<MemberCard member={member} group={group} />).toJSON();
  expect(tree).toMatchSnapshot();
});
