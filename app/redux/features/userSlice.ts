import { Reducer, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";

export interface UserStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null | {} | any;
  message: string | null;
  user: {} | null | any;
}

export const initialUserState: UserStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    resetUserSuccess: (state) => {
      state.success = false;
      state.user = null;
      state.message = null;
    },
    resetUserError: (state) => {
      state.error = null;
    },
    setUser: (state, { payload }: any) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.updateUser.matchFulfilled,
        (state, { payload }: any) => {
          state.success = true;
          state.user = payload;
        }
      )
      .addMatcher(
        userApi.endpoints.fetchUser.matchFulfilled,
        (state, { payload }: any) => {
          state.success = true;
          state.user = {
            ...state.user,
            username: payload.username,
            updatedAt: payload.updatedAt,
          };
        }
      )
      .addMatcher(
        (action: any) => action.type.endsWith("/rejected"),
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data.message;
        }
      );
  },
});

export const userReducer = userSlice.reducer as Reducer<UserStatePayload>;

export const { resetUserSuccess, resetUserError, setUser } = userSlice.actions;
