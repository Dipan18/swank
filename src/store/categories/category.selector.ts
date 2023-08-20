import { createSelector } from 'reselect';
import { CategoryItem } from './category.type';
import { RootState } from '../store';

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc.set(title.toLocaleLowerCase(), items);
      return acc;
    }, new Map<string, CategoryItem[]>())
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
