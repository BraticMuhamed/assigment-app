import React from 'react';
import { render, screen } from '@testing-library/react';

import Tabs from './Tabs';

test('render component', () => {
  render(<Tabs>test</Tabs>);

  const tabs = screen.getByText('test');

  expect(tabs).toBeInTheDocument();
});
