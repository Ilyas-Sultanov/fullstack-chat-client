import { IChat } from '../types/chat';
import { apiSlice } from '../api';
import { IPaginatedData } from '../types/paginatedData';
import { IMessage, INewMessage } from '../types/message';

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: function(build) {
    return {
  
      getMessages: build.query<IPaginatedData<IMessage>, {chatId: string, page: number, limit: number}>({
        query(queryParams) {
          return {
            url: '/api/message',
            method: 'GET',
            params: queryParams,
          }
        },
      }),

      sendMessage: build.mutation<IMessage, INewMessage >({
        query(message) {
          return {
            url: '/api/message',
            method: 'POST',
            body: message,
          }
        }
      })
    
    }
  }
})

export const { 
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;