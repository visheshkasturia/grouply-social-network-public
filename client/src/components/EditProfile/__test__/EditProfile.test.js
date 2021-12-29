import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditProfile from '../EditProfile'

it('EditProfile renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditProfile />, div);
});

it('EditProfile matches snapshot', () => {
  const tree = renderer.create(<EditProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});