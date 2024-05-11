import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApi } from 'API/api-service';

export const contactsAction = createAsyncThunk('createContacts', async () => {
  const data = await fetchApi.getContacts();
  return data;
});
export const addAction = createAsyncThunk('addContacts', async body => {
  const createItem = await fetchApi.createContact(body);
  console.log(`Contact ${createItem.name} was added`);
  return createItem;
});
export const deleteAction = createAsyncThunk('deleteContacts', async id => {
  const deletedItem = await fetchApi.deleteContact(id);
  console.log(`Contact ${deletedItem.name} was removed`);
  return deletedItem.id;
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
      .addCase(addAction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.items = state.items.filter(el => el.id !== action.payload);
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
