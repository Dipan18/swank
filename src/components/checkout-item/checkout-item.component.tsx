import { useAppDispatch } from '../../hooks/redux-store.hooks';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.reducer';
import { CartItem } from '../../store/cart/cart.type';

import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  Quantity,
  Value,
  RemoveButton,
} from './checkout-item.styles';


type CheckoutItemProps = {
  checkoutItem: CartItem
}

const CheckoutItem = ({ checkoutItem }: CheckoutItemProps) => {
  const dispatch = useAppDispatch();
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
