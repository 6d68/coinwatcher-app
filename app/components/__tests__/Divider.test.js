import React from 'react';
import Divider from '../divider';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Divider />).toJSON();
  expect(rendered).toMatchSnapshot();
});
