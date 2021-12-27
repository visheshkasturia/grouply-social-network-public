import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateGroup from '../CreateGroup'

it('CreateGroup renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateGroup />, div);
});

it('CreateGroup matches snapshot', () => {
  const tree = renderer.create(<CreateGroup />).toJSON();
  expect(tree).toMatchSnapshot();
});