import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChangePassword from '../ChangePassword'

it('ChangePassword renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangePassword />, div);
});

it('ChangePassword matches snapshot', () => {
  const tree = renderer.create(<ChangePassword />).toJSON();
  expect(tree).toMatchSnapshot();
});