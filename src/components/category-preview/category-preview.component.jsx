import { useSelector } from 'react-redux';

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from './category-preview.styles';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

const CategoryPreview = ({ title, products }) => {
  const productsToDisplay = 4;
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryPreviewContainer>
          <h2>
            <Title to={title}>{title}</Title>
          </h2>
          <Preview>
            {products
              .filter((_, index) => index < productsToDisplay)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Preview>
        </CategoryPreviewContainer>
      )}
    </>
  );
};

export default CategoryPreview;
