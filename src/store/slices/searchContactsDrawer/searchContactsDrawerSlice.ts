import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  isOpen: boolean
}

const initialState: IInitialState = {
  isOpen: false,
};

const searchContactsDrawerSlice = createSlice({
  name: 'searchContactsDrawer',
  initialState,
  reducers: {
    setSearchContactsDrawerIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  }
})

export const { setSearchContactsDrawerIsOpen } = searchContactsDrawerSlice.actions;
export const searchContactsDrawerReducer = searchContactsDrawerSlice.reducer;