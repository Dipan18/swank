import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';

import { fetchCategoriesAndDocuments } from '../../network/firebase/firebase.firestore';
import { Category } from './category.type';

export type CategorySliceState = {
  categories: Category[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: CategorySliceState = {
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      }
    );
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const categoriesReducer = categorySlice.reducer;
