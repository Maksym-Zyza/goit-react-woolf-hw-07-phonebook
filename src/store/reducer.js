import { combineReducers } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';
import { filterReducer } from './filter/slice';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
