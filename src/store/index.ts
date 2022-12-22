import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from '@reduxjs/toolkit';
import { apiSlice } from '../api';
import { userReducer } from './slices/user';
import { chatReducer } from './slices/chat/chatSlice';
import { searchContactsDrawerReducer } from './slices/searchContactsDrawer/searchContactsDrawerSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer,
  chat: chatReducer,
  searchContactsDrawer: searchContactsDrawerReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware)
    }
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];