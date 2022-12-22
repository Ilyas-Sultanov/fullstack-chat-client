import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '../../../types/chat';

interface IInitialState {
  selectedChat: IChat | null
}

const initialState: IInitialState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<IChat | null>) {
      state.selectedChat = action.payload;
    },
    deleteUserFromState(state, action: PayloadAction<string>) {
      if (state.selectedChat) {
        state.selectedChat.users = state.selectedChat.users.filter((user) => user._id === action.payload);
      }
    }
  }
})

export const { setSelectedChat, deleteUserFromState } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;