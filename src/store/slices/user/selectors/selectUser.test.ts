import { selectUser } from "./selectUser";
import { IUser } from "../../../../types";
import { setupStore } from '../../../';

const store = setupStore();
const state = store.getState();

const user: IUser = {
  _id: "63808c88d01d737336e01a4a",
  name: 'user1',
  email: 'zerocool174@mail.ru',
  avatar: 'img/no-avatar.jpg',
  roles: [ 'user' ],
  isActivated: true
}

describe('selectUser selector', () => {
  test('Should return user', () => {
    const fakeUserState = {...state, user: {user}};
    expect(selectUser(fakeUserState)).toEqual(user);
  });

  test('Should return null', () => {
    const fakeUserState = {...state, user: {user: null}};
    expect(selectUser(fakeUserState)).toEqual(null);
  });

}); 