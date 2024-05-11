import { createSlice } from '@reduxjs/toolkit';
import testData from '../../Data/testData.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [...testData] },
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.push(payload);
    },
    deleteContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(el => el.id !== payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
