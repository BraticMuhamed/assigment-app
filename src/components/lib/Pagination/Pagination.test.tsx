import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Pagination from './Pagination';
import rootReducer from '../../../redux/rootReducer';

test('render component and select different page', () => {
  const THREE = 3;
  const FOUR = 4;
  let page = 1;

  const testFunction = (id: number | undefined): void => {
    if (id !== undefined) {
      page = id;
    }
  };

  render(
    <Provider
      store={configureStore({
        reducer: rootReducer,
        preloadedState: {
          items: {
            results: {
              total_pages: 10,
            },
          },
        },
      })}
    >
      <Pagination currentPage={page} onPageChange={testFunction} />
    </Provider>
  );

  const pagination = screen.getByRole('list');

  expect(pagination).toBeInTheDocument();

  const paginationItems = screen.getAllByRole('listitem');

  fireEvent.click(paginationItems[THREE]);

  expect(page).toEqual(FOUR);
});
