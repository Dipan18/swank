import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from './cart.type';
import { CategoryItem } from '../categories/category.type';

const addProductToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const doesProductToAddExistInCart = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (doesProductToAddExistInCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeProductFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CategoryItem
) => {
  const productToRemove = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (productToRemove?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove?.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearProductFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CategoryItem
) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

type CartSliceState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  itemsInCartCount: number;
  cartTotal: number;
};

const initialState: CartSliceState = {
  isCartOpen: false,
  cartItems: [],
  itemsInCartCount: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CategoryItem>) => {
      state.cartItems = addProductToCart(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<CategoryItem>) => {
      state.cartItems = removeProductFromCart(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action: PayloadAction<CategoryItem>) => {
      state.cartItems = clearProductFromCart(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
