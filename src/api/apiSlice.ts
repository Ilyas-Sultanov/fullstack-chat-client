import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types';
import { setUser, logOut } from '../store/slices/user';
import { apiUrl } from './baseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  credentials: 'include',
  prepareHeaders: function(headers, /*{ getState }*/) {
    headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Запрос на refresh token
    const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      const user = (refreshResult.data as {user: IUser, accessToken: string}).user;
      const accessToken = (refreshResult.data as {user: IUser, accessToken: string}).accessToken;
      api.dispatch(setUser(user));
      localStorage.setItem('token', accessToken);
      result = await baseQuery(args, api, extraOptions);
    }
    else {
      api.dispatch(logOut());
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Chat'],
  endpoints: (build) => ({})
})