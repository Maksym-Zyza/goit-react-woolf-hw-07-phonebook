import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchApi } from 'API/api-service';

// export const contactsAction = () => {
//   return async dispatch => {
//     try {
//       dispatch(contactsSlice.actions.fetching());
//       const data = await fetchApi.getContacts();
//       dispatch(contactsSlice.actions.success(data));
//     } catch (error) {
//       dispatch(contactsSlice.actions.error(error));
//     }
//   };
// };

export const contactsAction = createAsyncThunk('contacts', async () => {
  const data = await fetchApi.getContacts();
  return data;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(contactsAction.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(contactsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(contactsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

// reducers: {
//   fetching: state => {
//     state.isLoading = true;
//     state.error = '';
//   },
//   success: (state, action) => {
//     state.isLoading = false;
//     state.items = action.payload;
//   },
//   error: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload.message;
//   },
// },
