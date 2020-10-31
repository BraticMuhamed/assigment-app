import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from './store';
import { getItems, Items, searchItems as searchItemsApi } from '../api/tmdbApi';

export interface ItemsState {
  results: Items;
  isLoading: boolean;
  error: string | null;
}

const initState: ItemsState = {
    results: {
		page: 1,
		total_pages: 0,
		total_results: 0,
		results: [],
	},
    isLoading: false,
    error: null,
}

function getItemsLoading(state: ItemsState): void {
  state.isLoading = true;
  state.results = initState.results;
  state.error = initState.error;
}

function getItemsFailed(
  state: ItemsState,
  action: PayloadAction<string>
): void {
  state.isLoading = false;
  state.error = action.payload;
  state.results = initState.results;
}

const itemsSlice = createSlice({
  name: 'getItems',
  initialState: initState,
  reducers: {
    getItemsRequest: getItemsLoading,
    getItemsSuccess(state, { payload }: PayloadAction<Items>) {
      state.results = payload;
      state.isLoading = false;
      state.error = null;
    },
    getItemsFailure: getItemsFailed,
  },
});

export const {
  getItemsRequest,
  getItemsSuccess,
  getItemsFailure,
} = itemsSlice.actions;

export default itemsSlice.reducer;

export const fetchItems = (tab: string): AppThunk => async dispatch => {
  try {
    dispatch(getItemsRequest());

    const startLength = 0, endLength = 10;
    const data = await getItems(tab);
    data.results = data.results.slice(startLength, endLength);

    dispatch(getItemsSuccess(data));
  } catch (error) {
    dispatch(getItemsFailure(error));
  }
};

export const searchItems = (tab: string, searchTerm: string, page: number): AppThunk => async dispatch => {
  try {
    dispatch(getItemsRequest());

    const data = await searchItemsApi(tab, searchTerm, page);

    dispatch(getItemsSuccess(data));
  } catch (error) {
    dispatch(getItemsFailure(error))
  }
}