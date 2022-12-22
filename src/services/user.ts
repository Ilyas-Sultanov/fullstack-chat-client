import { IUser } from '../types/user';
import { apiSlice } from '../api';
import { IPaginatedData } from '../types/paginatedData';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: function(build) {
    return {
      searchUser: build.query<IPaginatedData<IUser>, {name: string, page: number, limit: number}>({
        query(queryParams) {
          return {
            url: `/api/users`,
            method: 'GET',
            params: queryParams,
          }
        },
      }),

      
    }
  }
})

export const { 
  useSearchUserQuery,
  useLazySearchUserQuery,
} = userApiSlice;