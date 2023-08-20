import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from './user.type';

type UserSliceState = {
  currentUser: UserData | null;
};

const initialState: UserSliceState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
