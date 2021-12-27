import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InviteUser from '../InviteUser'

it('InviteUser renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InviteUser  />, div);
});

it('InviteUser matches snapshot', () => {
  const tree = renderer.create(<InviteUser  />).toJSON();
  expect(tree).toMatchSnapshot();
});
