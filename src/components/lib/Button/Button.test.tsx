import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

test('render component and checks onClick function working', () => {
  let tempString = '';
  const testOnClickFunction = (): string => (tempString = 'clicked');

  render(<Button label="test" onClick={testOnClickFunction} />);

  const button = screen.getByText('test');

  expect(button).toBeInTheDocument();
  expect(tempString).toBe('');

  fireEvent.click(button);

  expect(tempString).toBe('clicked');
});
