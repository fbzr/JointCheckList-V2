import {combineReducers} from '@reduxjs/toolkit';
import collectionReducer from './slices/collection';

const rootReducer = combineReducers({
  collection: collectionReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
