import { authHandlers } from "./auth/auth";
import { chatHandlers } from './chats/chats';

export const handlers = [...authHandlers, ...chatHandlers];