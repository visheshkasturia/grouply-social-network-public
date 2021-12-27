import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePost from '../CreatePost'

it('CreatePost renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatePost />, div);
});

it('CreatePost matches snapshot', () => {
  const tree = renderer.create(<CreatePost />).toJSON();
  expect(tree).toMatchSnapshot();
});