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

export function debounce(fn: (...args: any[]) => void, ms: number) {
  let timeout: number;
  return function(...args: any[]) {
    const fnCall = () => {fn(...args)}
    clearTimeout(timeout);
    timeout = window.setTimeout(fnCall, ms);
  }
}