import { useAppSelector, useAppDispatch } from '../../hooks/redux-store.hooks';

import {
  selectIsCartOpen,
  selectItemsInCartCount,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useAppDispatch();

  const isCartOpen = useAppSelector(selectIsCartOpen);
  const itemsInCartCount = useAppSelector(selectItemsInCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{itemsInCartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
