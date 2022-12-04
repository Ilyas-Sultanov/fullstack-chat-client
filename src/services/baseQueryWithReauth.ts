import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types';
import { setUser, logOut } from '../store/slices/user';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: function(headers, /*{ getState }*/) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});
// as BaseQueryFn<string | FetchArgs, unknown, { status: number; data: {message: string}}, {}>

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Запрос на refresh token
    const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      const user = (refreshResult.data as {user: IUser, accessToken: string}).user;
      const accessToken = (refreshResult.data as {user: IUser, accessToken: string}).accessToken;
      // Сохраняем новый токен и пользователя (на случай если его нет в сторе)
      api.dispatch(setUser(user));
      localStorage.setItem('token', accessToken);
      result = await baseQuery(args, api, extraOptions);
    }
    else {
      api.dispatch(logOut()); // если обновить access token не удалось, то удаляем refresh token
    }
  }

  return result;
}