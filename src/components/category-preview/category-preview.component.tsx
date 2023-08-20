import { useAppSelector } from '../../hooks/redux-store.hooks';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';

import { CategoryItem } from '../../store/categories/category.type';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from './category-preview.styles';

type CategoryPreviewProps = {
  title: string,
  products: CategoryItem[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  const productsToDisplay = 4;
  const isLoading = useAppSelector(selectCategoriesIsLoading);

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
