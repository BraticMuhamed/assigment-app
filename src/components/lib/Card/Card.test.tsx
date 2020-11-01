import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Card from './Card';
import { Item } from '../../../api/tmdbApi';

test('render component with no image', () => {
  const item: Item = {
    title: 'test title',
    id: 1,
    overview: 'something about something',
    videos: {
      results: [],
    },
  };
  const checkId = 0;
  let id = 0;

  render(<Card item={item} tab="movie" onClick={index => (id = index)} />);

  const card = screen.getByText('test title');

  expect(card).toBeInTheDocument();

  fireEvent.click(card);

  expect(id).not.toEqual(checkId);
});
