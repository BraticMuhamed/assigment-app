import { combineReducers } from 'redux';

import homeReducer from './homeSlice';
import itemsReducer from './itemsSlice';
import itemReducer from './itemSlice';

const rootReducer = combineReducers({
	home: homeReducer,
	items: itemsReducer,
	item: itemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
