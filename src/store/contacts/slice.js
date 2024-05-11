import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApi } from 'API/api-service';

export const contactsAction = createAsyncThunk('createContacts', async () => {
  const data = await fetchApi.getContacts();
  return data;
});
export const deleteAction = createAsyncThunk('deleteContacts', async id => {
  const data = await fetchApi.deleteContact(id);
  return data;
});

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};
const handleFulfilled = state => {
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(contactsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        handleFulfilled
      );
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
