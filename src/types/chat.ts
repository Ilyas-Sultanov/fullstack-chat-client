import { IUser } from './user';

export interface INewChat {
  _id: string,
  name: string,
  isGroupChat: boolean,
  users: Array<IUser>,
  groupAdmin?: IUser,
}

export interface IChat extends INewChat {
  createdAt: string
}