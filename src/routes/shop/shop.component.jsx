import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCategories } from '../../store/categories/category.reducer';

import Category from '../category/category.component';
import BrowseCategories from '../browse-categories/browse-categories.component';

const Shop = () => {
  const dispatch = useDispatch();

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
