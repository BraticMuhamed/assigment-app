import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from '../Home';
import Details from './Details';
import store from '../../redux/store';

const ONE = 1;

beforeEach(() =>
  render(
    <Provider store={store}>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/:tab/:id">
        <Details />
      </Route>
    </Provider>,
    { wrapper: MemoryRouter }
  )
);

test('renders home, click on details then render details and pushback', async () => {
  const cards = await screen.findAllByTestId(/card/i);

  expect(cards[ONE]).toBeInTheDocument();

  fireEvent.click(cards[ONE]);

  const details = await screen.findByTestId('details');

  expect(details).toBeInTheDocument();

  const heading = await screen.findByRole('heading');

  expect(heading).toBeInTheDocument();

  const back = await screen.findByText('Back');

  fireEvent.click(back);

  const home = await screen.findByTestId('home-component');

  expect(home).toBeInTheDocument();
});
