import { createSlice } from '@reduxjs/toolkit';

const addProductToCart = (cartItems, productToAdd) => {
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

const removeProductFromCart = (cartItems, cartItemToRemove) => {
  const productToRemove = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (productToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearProductFromCart = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemsInCartCount: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    addItemToCart: (state, action) => {
      console.log('payloada', action.payload);
      state.cartItems = addProductToCart(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeProductFromCart(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
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
