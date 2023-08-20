import { useSelector } from 'react-redux';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const BrowseCategories = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        ))
      )}
    </>
  );
};

export default BrowseCategories;
