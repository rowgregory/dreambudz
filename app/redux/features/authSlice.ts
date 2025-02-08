import { Reducer, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

export interface AuthStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  isAuthenticated: boolean | null;
  isAdmin: boolean | null;
  userId: number | null;
  registerCodeVerified: boolean;
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: "",
  isAuthenticated: false,
  isAdmin: false,
  userId: null,
  registerCodeVerified: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    resetAuth: (state) => {
      state.success = false;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.loading = false;
      state.userId = null;
    },
    setAuthState(state, { payload }) {
      state.isAuthenticated = true;
      state.userId = payload.id;
      state.isAdmin = payload.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state: any, { payload }: any) => {
          state.isAuthenticated = payload.isAuthenticated;
          state.userId = payload.id;
          state.isAdmin = payload.isAdmin;
          state.loading = false;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state: any, { payload }: any) => {
          state.accountWasCreated = payload.accountWasCreated;
          state.isAdmin = payload.isAdmin;
          state.loading = false;
        }
      )
      .addMatcher(
        authApi.endpoints.verifyRegisterCode.matchFulfilled,
        (state: any) => {
          state.success = true;
          state.registerCodeVerified = true;
          state.loading = false;
        }
      )
      .addMatcher(
        authApi.endpoints.verifyVisitorCode.matchFulfilled,
        (state: any, { payload }: any) => {
          state.success = payload.codeIsValid;
          state.loading = false;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state: any) => {
        state.success = true;
      });
  },
});

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>;

export const { resetAuth, setAuthState } = authSlice.actions;
