import { Reducer, createSlice } from "@reduxjs/toolkit";
import { codeApi } from "../../services/codeApi";

export interface CodeStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  code: [] | null;
  token: string | null;
}

export const initialCodeState: CodeStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  code: null,
  token: null,
};

export const codeSlice = createSlice({
  name: "code",
  initialState: initialCodeState,
  reducers: {
    resetCodeSuccess: (state) => {
      state.success = false;
      state.code = null;
      state.message = null;
    },
    resetCodeError: (state) => {
      state.error = null;
      state.message = null;
    },
    resetCodeSuccessOnly: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        codeApi.endpoints.verifyCode.matchFulfilled,
        (state: any, { payload }: any) => {
          state.success = payload.codeIsValid;
          state.token = payload.token;
        }
      )
      .addMatcher(
        codeApi.endpoints.createCode.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
        }
      )
      .addMatcher(
        codeApi.endpoints.updateCode.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
        }
      )
      .addMatcher(
        codeApi.endpoints.getCode.matchFulfilled,
        (state: any, { payload }: any) => {
          state.code = payload.code;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "codeApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const codeReducer = codeSlice.reducer as Reducer<CodeStatePayload>;

export const { resetCodeSuccess, resetCodeError, resetCodeSuccessOnly } =
  codeSlice.actions;
