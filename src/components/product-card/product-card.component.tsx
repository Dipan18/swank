import { useAppDispatch } from '../../hooks/redux-store.hooks';
import { addItemToCart } from '../../store/cart/cart.reducer';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  ProductCardContainer,
  Footer,
  ProductName,
  ProductPrice,
} from './product-card.styles';
import { CartItem } from '../../store/cart/cart.type';

type ProductCardProps = {
  product: CartItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  const { name, imageUrl, price } = product;

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
      </Footer>
      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add To Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
