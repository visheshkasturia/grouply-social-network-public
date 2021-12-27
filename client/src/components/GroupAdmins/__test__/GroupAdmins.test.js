import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GroupAdmins from '../GroupAdmins'
import GroupAdminCard from '../GroupAdminCard/GroupAdminCard'

const admin = 'abc'
const group = {
  groupName: "test",
  description: "desc",
  admins: [admin]
}

it('GroupAdmins renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupAdmins group={group} />, div);
});

it('GroupAdmins matches snapshot', () => {
  const tree = renderer.create(<GroupAdmins group={group} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('GroupAdminCard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GroupAdminCard group={group} admin={admin} />, div);
});

it('GroupAdminCard matches snapshot', () => {
  const tree = renderer.create(<GroupAdminCard admin={admin} />).toJSON();
  expect(tree).toMatchSnapshot();
});