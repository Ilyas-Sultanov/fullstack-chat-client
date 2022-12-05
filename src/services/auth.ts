import { INewUser, IUser } from '../types';
import { apiSlice } from '../api';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: function(build) {
    return {
      registration: build.mutation<null, INewUser>({
        query(newUser) {
          return {
            url: '/api/auth/registration',
            method: 'POST',
            body: newUser
          }
        },
      }),

      login: build.mutation<{user: IUser, accessToken: string}, {email: string, password: string}>({ // Первый дженерик - это то что вернётся, а второй - то что мы передаём аргументом
        query(loginData) {
          return {
            url: '/api/auth/login',
            method: 'POST',
            body: loginData,
          }
        }
      }),

      refresh: build.query<{user: IUser, accessToken: string}, string>({
        query() {
          return {
            url: '/api/auth/refresh',
          }
        }
      }),

      logout: build.query<{message: string}, ''>({
        query() {
          return {
            url: '/api/auth/logout'
          }
        } 
      }),

      restore: build.mutation<null, {email: string}>({
        query(restoreData) {
          return {
            url: '/api/auth/forgotPassword',
            method: 'POST',
            credentials: 'omit', // Не нужно отправлять refresh токен, ведь его нет при восстановлении пароля (иначе CORS ругается)
            body: restoreData,
          }
        }
      }),

      resetPassword: build.mutation<null, {resetLink: string, newPassword: string}>({
        query(restorePasswordData) {
          return {
            url: '/api/auth/resetPassword',
            method: 'PATCH',
            body: restorePasswordData,
          }
        }
      })
    }
  }
})

export const { 
  useRegistrationMutation, 
  useLoginMutation, 
  useRefreshQuery, 
  useLogoutQuery, 
  useRestoreMutation,
  useResetPasswordMutation,
} = authApiSlice;