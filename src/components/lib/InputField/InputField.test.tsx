import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import InputField from './InputField';

test('render compnent and change value', () => {
  let value = '';

  render(
    <InputField
      onChange={event => (value = event.target.value)}
      value={value}
    />
  );

  const field = screen.getByPlaceholderText('Search');

  expect(field).toBeInTheDocument();

  fireEvent.change(field, { target: { value: 'test' } });

  expect(value).toEqual('test');
});
