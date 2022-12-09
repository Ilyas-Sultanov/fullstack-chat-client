import { RootState } from "../../..";

export function selectUser(state: RootState) {
  return state.user.user;
}