import { IUser } from './user';

export interface IChat {
  _id: string,
  name: string,
  isGroupChat: true,
  users: Array<IUser>,
  groupAdmin: IUser,
}