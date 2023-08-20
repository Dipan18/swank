import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  selectIsCartOpen,
  selectItemsInCartCount,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const itemsInCartCount = useSelector(selectItemsInCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{itemsInCartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
