"use client";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./features/authSlice";
import { api } from "./services/api";
import { progressBarReducer } from "./features/progressBarSlice";
import { dashboardReducer } from "./features/dashboardSlice";
import { productReducer } from "./features/productSlice";
import { codeReducer } from "./features/codeSlice";
import { visitorReducer } from "./features/visitorSlice";
import { userReducer } from "./features/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  code: codeReducer,
  progressBar: progressBarReducer,
  visitor: visitorReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
