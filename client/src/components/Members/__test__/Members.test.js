import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Members from '../Members'

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

it('Members renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Members group={group} />, div);
});

it('Members matches snapshot', () => {
  const tree = renderer.create(<Members group={group} />).toJSON();
  expect(tree).toMatchSnapshot();
});
