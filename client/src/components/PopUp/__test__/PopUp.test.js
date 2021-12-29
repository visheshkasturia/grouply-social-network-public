import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PopUp from '../PopUp';

describe('PopUp renders correctly', () => {
  it('Button has correct text', () => {
    const { getByTestId } = render(<PopUp />);
    expect(getByTestId('pop-close-test')).toHaveTextContent('Close');
  });

  it('Matches snapshot', () => {
    const tree = renderer.create(<PopUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
