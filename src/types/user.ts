export interface IUser {
  _id: string
  name: string
  email: string
  avatar: string
  roles: Array<TUserRole>
  isActivated: boolean
  createdAt?: string
}

export type TUserRole = 'user' | 'admin'

export interface INewUser extends Omit<IUser, '_id' | 'avatar' | 'roles' | 'isActivated'> {
  password: string
}