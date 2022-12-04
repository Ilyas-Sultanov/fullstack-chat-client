import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from '@reduxjs/toolkit'
import { userReducer } from './slices/user';
import { authApi } from '../services/auth';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  user: userReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(authApi.middleware)
    }
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];


// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from './slices/api';
// import { authReducer } from './slices/auth';

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(apiSlice.middleware)
//   }
// });

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;