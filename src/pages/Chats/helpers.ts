import { IUser } from "../../types";
import { IChat } from "../../types/chat";

export function getChatName(currentUser: IUser, chat: IChat) {
  if (!chat.isGroupChat && chat.users.length > 0) {
    const targetUser = chat.users.filter((user) => user._id !== currentUser._id);
    if (targetUser) {
      return targetUser[0].name;
    }
  }  
  return chat.name;
}