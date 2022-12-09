import { userReducer, setUser, logOut } from './';
import { IUser } from "../../../types";
import { setupStore } from '../../';

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

describe('userReducer', () => {
  test('Should set user', () => {
    const result = userReducer(state.user, setUser(user));
    expect(result).toEqual({user: user});
  });

  test('Should remove user', () => {
    const fakeUserState = {...state.user, user};
    const result = userReducer(fakeUserState, logOut());
    expect(result).toEqual({user: null});
  });
});