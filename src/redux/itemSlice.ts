import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from './store';
import { getItem, Item } from '../api/tmdbApi';

interface ItemState {
  result: Item;
  isLoading: boolean;
  error: string | null;
}

const initState: ItemState = {
  result: {
    title: '',
    name: '',
    overview: '',
    id: 0,
    poster_path: '',
  },
  isLoading: false,
  error: null,
};

function getItemLoading(state: ItemState): void {
  state.isLoading = true;
  state.result = initState.result;
  state.error = initState.error;
}

function getItemFailed(state: ItemState, action: PayloadAction<string>): void {
  state.isLoading = false;
  state.error = action.payload;
  state.result = initState.result;
}

function setItemInit(state: ItemState): void {
  state.error = initState.error;
  state.isLoading = initState.isLoading;
  state.result = initState.result
}

const itemSlice = createSlice({
  name: 'getItem',
  initialState: initState,
  reducers: {
    getItemRequest: getItemLoading,
    getItemSuccess(state, { payload }: PayloadAction<Item>) {
      state.result = payload;
      state.isLoading = false;
      state.error = null;
    },
    getItemFailure: getItemFailed,
    getItemInit: setItemInit,
  },
});

export const {
  getItemRequest,
  getItemSuccess,
  getItemFailure,
  getItemInit,
} = itemSlice.actions;

export default itemSlice.reducer;

export const fetchItem = (
  tab: string,
  id: number
): AppThunk => async dispatch => {
  try {
    dispatch(getItemRequest());

    const data = await getItem(tab, id);

    dispatch(getItemSuccess(data));
  } catch (error) {
    dispatch(getItemFailure(error));
  }
};
