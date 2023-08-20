import { CartItemContainer, ItemDetail, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemDetail>{name}</ItemDetail>
        <ItemDetail>
          {quantity} x ${price}
        </ItemDetail>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
