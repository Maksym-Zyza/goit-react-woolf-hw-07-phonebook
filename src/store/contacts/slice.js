import { createSlice } from '@reduxjs/toolkit';
import { fetchApi } from 'API/api-service';

export const contactsAction = () => {
  return async dispatch => {
    try {
      dispatch(contactsSlice.actions.fetching());
      const data = await fetchApi.getContacts();
      dispatch(contactsSlice.actions.success(data));
    } catch (error) {
      dispatch(contactsSlice.actions.error(error));
    }
  };
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {
    fetching: state => {
      state.isLoading = true;
      state.error = '';
    },
    success: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    error: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

// addContact: (state, { payload }) => {
//   state.contacts.push(payload);
// },
// deleteContact: (state, { payload }) => {
//   state.contacts = state.contacts.filter(el => el.id !== payload);
// },
