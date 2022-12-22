import { RootState } from "../../..";

export function selectSearchContactsDrawerIsOpen(state: RootState) {
  return state.searchContactsDrawer.isOpen;
}