import { IChat } from '../types/chat';
import { apiSlice } from '../api';
import { IPaginatedData } from '../types/paginatedData';

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: function(build) {
    return {
      searchChat: build.query<IPaginatedData<IChat>, {name: string, page: number, limit: number}>({ // Обязательно прочти про пагинацию с RTK Query сдесь: https://redux-toolkit.js.org/rtk-query/usage/pagination
        query(queryParams) {
          return {
            url: `/api/chat/search`,
            method: 'GET',
            params: queryParams
          }
        },
      }),
      getUserChats: build.query<Array<IChat>, null>({
        query() {
          return {
            url: '/api/chat',
            method: 'GET',
          }
        },
        providesTags: [{type: 'Chat', id: 'List'}]
      }),
      accessChat: build.mutation<IChat, string>({
        query(targetUserId) {
          return {
            url: '/api/chat',
            method: 'POST',
            body: {targetUserId},
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      }),
      createGroupChat: build.mutation<null, string>({
        query(name) {
          return {
            url: '/api/chat/groupCreate',
            method: 'POST',
            body: {name}
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      }),
      joinToGroupChat: build.mutation<null, string>({
        query(groupChatId) {
          return {
            url: '/api/chat/groupJoin',
            method: 'PUT',
            body: {groupChatId},
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      }),
      deleteUserFromChat: build.mutation<null, {chatId: string, userId: string}>({
        query(body) {
          return {
            url: 'api/chat/deleteUserFromChat',
            method: 'PATCH',
            body,
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      }),
      renameGroupChat: build.mutation<null, {groupChatId: string, newName: string}>({
        query(body) {
          return {
            url: 'api/chat/groupRename',
            method: 'PATCH',
            body,
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      }),
      deleteGroupChat: build.mutation<null, string>({
        query(chatId) {
          return {
            url: 'api/chat/groupDelete',
            method: 'DELETE',
            body: {chatId}
          }
        },
        invalidatesTags: [{type: 'Chat', id: 'List'}]
      })
    }
  }
})

export const { 
  useLazySearchChatQuery,
  useGetUserChatsQuery,
  useAccessChatMutation,
  useJoinToGroupChatMutation,
  useCreateGroupChatMutation,
  useDeleteUserFromChatMutation,
  useRenameGroupChatMutation,
  useDeleteGroupChatMutation,
} = chatApiSlice;