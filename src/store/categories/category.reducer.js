import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCategoriesAndDocuments } from '../../network/firebase/firebase.firestore';

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'content/fetchCategories',
  async () => {
    return await fetchCategoriesAndDocuments();
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const categoriesReducer = categorySlice.reducer;
