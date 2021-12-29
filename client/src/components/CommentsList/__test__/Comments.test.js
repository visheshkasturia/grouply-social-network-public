import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentItem from '../CommentItem'
import CommentsList from '../CommentsList'

const comment = {
  commentBy: '61abcfdf692a1b833a551528',
  commentContent: 'Test- add comment BE - 1??'
}

const comments = [comment]
it('CommentItem renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentItem comment={comment} />, div);
});

it('CommentItem matches snapshot', () => {
  const tree = renderer.create(<CommentItem comment={comment}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('CommentsList renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentsList comments={comments} />, div);
});


it('CommentsList matches snapshot', () => {
  const tree = renderer.create(<CommentsList comments={comments}/>).toJSON();
  expect(tree).toMatchSnapshot();
});