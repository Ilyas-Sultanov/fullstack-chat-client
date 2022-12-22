import { RootState } from "../../..";

export function selectSelectedChat(state: RootState) {
  return state.chat.selectedChat;
}