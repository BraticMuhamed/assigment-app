import React from 'react';
import { render, screen } from '@testing-library/react';

import Image from './Image';

test('render component with default image', () => {
  render(<Image src="" />);

  const image = screen.getByRole('img');

  expect(image).toBeInTheDocument();
});

test('render component with image source', () => {
  render(<Image src="/default_image" />);

  const image = screen.getByRole('img');

  expect(image).toBeInTheDocument();
});
