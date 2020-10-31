import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const homeSlice = createSlice({
	name: 'home',
	initialState: { tab: 'tv', searchTerm: '' },
	reducers: {
		changeTab(state, action: PayloadAction<string>) {
			return {
				...state,
				tab: action.payload,
			};
		},
		changeSearchTerm(state, action: PayloadAction<string>) {
			return {
				...state,
				searchTerm: action.payload,
			}
		}
	}
})

export const { changeTab, changeSearchTerm } = homeSlice.actions;

export default homeSlice.reducer;