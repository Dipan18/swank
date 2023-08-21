import { CartItem as CartItemType} from '../../store/cart/cart.type';
import { CartItemContainer, ItemDetail, ItemDetails } from './cart-item.styles';

type CartItemProps = {
  cartItem: CartItemType
}

const CartItem = ({cartItem}: CartItemProps) => {
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
