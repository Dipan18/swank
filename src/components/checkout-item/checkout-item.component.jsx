import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.reducer';

import './checkout-item.styles.jsx';
import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  Quantity,
  Value,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ checkoutItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = checkoutItem;

  const onAddItemHandler = () => dispatch(addItemToCart(checkoutItem));

  const onRemoveItemHandler = () => dispatch(removeItemFromCart(checkoutItem));

  const onClearItemHandler = () => dispatch(clearItemFromCart(checkoutItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={onRemoveItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={onAddItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={onClearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
