import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types';

interface IInitialState {
  user: IUser | null
}

const initialState: IInitialState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  }
})

export const { setUser, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;