export interface INewMessage {
  content: string
  chatId: string
}

export interface IMessage extends INewMessage {
  _id: string
  sender: string
  createdAt: string
  updatedAt: string
}