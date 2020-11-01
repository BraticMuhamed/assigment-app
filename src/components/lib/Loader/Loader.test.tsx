import React from 'react';
import { render, screen } from '@testing-library/react';

import Loader from './Loader';

test('render component', () => {
  render(<Loader />);

  const loader = screen.getByText('Loading...');

  expect(loader).toBeInTheDocument();
});
