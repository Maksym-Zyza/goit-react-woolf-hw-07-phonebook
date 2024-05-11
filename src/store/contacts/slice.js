import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchApi } from 'API/api-service';

export const fetchContacts = createAsyncThunk('fetchAll', async () => {
  const data = await fetchApi.getContacts();
  return data;
});
export const addContact = createAsyncThunk('addContact', async body => {
  const createItem = await fetchApi.createContact(body);
  toast.success(`Contact ${createItem.name} was added`);
  return createItem;
});
export const deleteContact = createAsyncThunk('deleteContact', async id => {
  const deletedItem = await fetchApi.deleteContact(id);
  toast.success(`Contact ${deletedItem.name} was removed`);
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
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
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

export const contactsReducer = contactsSlice.reducer;
