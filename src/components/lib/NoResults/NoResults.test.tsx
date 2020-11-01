import React from 'react';
import { render, screen } from '@testing-library/react';

import NoResults from './NoResults';

test('render component', () => {
  render(<NoResults text="No results" />);

  const noResults = screen.getByText('No results');

  expect(noResults).toBeInTheDocument();
});
