import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.reducer';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCardContainer,
  Footer,
  ProductName,
  ProductPrice,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(product));

  const { name, imageUrl, price } = product;

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
      </Footer>
      <Button onClick={addProductToCart} type={BUTTON_TYPE_CLASSES.inverted}>
        Add To Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
