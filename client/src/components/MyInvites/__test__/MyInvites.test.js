import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyInvites from '../MyInvites'

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

const user = {
  _id: '1',
  invitations: ['abc'],
}

it('MyInvites renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyInvites user={user} />, div);
});

it('Members matches snapshot', () => {
  const tree = renderer.create(<MyInvites user={user} />).toJSON();
  expect(tree).toMatchSnapshot();
});
