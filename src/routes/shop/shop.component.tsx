import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux-store.hooks';
import { fetchCategories } from '../../store/categories/category.reducer';

import Category from '../category/category.component';
import BrowseCategories from '../browse-categories/browse-categories.component';

const Shop = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Routes>
      <Route index element={<BrowseCategories />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
