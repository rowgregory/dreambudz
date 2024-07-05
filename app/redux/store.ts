"use client";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import { api } from "./services/api";
import storage from "../utils/createNoopStorage";
import { progressBarReducer } from "./features/progress-bar/progressBarSlice";
import { dashboardReducer } from "./features/dashboard/dashboardSlice";
import { productReducer } from "./features/product/productSlice";
import { codeReducer } from "./features/code/codeSlice";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
      blacklist: ["success"], // do not persist 'success' within 'auth'
    },
    authReducer
  ),
  dashboard: dashboardReducer,
  product: productReducer,
  code: codeReducer,
  progressBar: progressBarReducer,
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
