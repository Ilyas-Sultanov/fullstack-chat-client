export interface IUser {
  _id: string
  name: string
  email: string
  avatar: string
  roles: string[]
  isActivated: boolean
}

export interface INewUser extends Omit<IUser, '_id' | 'avatar' | 'roles' | 'isActivated'> {
  password: string
}