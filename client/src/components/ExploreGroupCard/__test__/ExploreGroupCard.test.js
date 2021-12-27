import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExploreGroupCard from '../ExploreGroupCard'

const group = {
  groupName: "test",
  description: "desc",
}

it('ExploreGroupCard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExploreGroupCard group={group} />, div);
});

it('ExploreGroupCard matches snapshot', () => {
  const tree = renderer.create(<ExploreGroupCard group={group} />).toJSON();
  expect(tree).toMatchSnapshot();
});