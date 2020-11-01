import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './index';
import store from '../../redux/store';
import { tabs } from '../../helpers/constants';

beforeEach(() =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
    { wrapper: MemoryRouter }
  )
);

test('renders component, fetches data and switch tabs', async () => {
  const cards = await screen.findByTestId('cards-container');

  expect(cards).toBeInTheDocument();

  const tab = screen.getByText(tabs.movie.label);

  expect(tab).toBeInTheDocument();

  fireEvent.click(tab);

  const cardsMovies = await screen.findByTestId('cards-container');

  expect(cardsMovies).toBeInTheDocument();
});

test('inputs search and receives results', async () => {
  const field = await screen.findByPlaceholderText('Search');

  fireEvent.change(field, { target: { value: 'test' } });

  const cards = await screen.findByTestId('cards-container');

  expect(cards).toBeInTheDocument();
});
