import { createSelector } from 'reselect';
import { CategoryItem } from './category.type';
import { RootState } from '../store';

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

type AccumulatorType = {
  [key: string]: CategoryItem[];
};

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLocaleLowerCase()] = items;
      return acc;
    }, {} as AccumulatorType)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
