import { Reducer, createSlice } from "@reduxjs/toolkit";
import { codeApi } from "../services/codeApi";

export interface CodeStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null | {} | any;
  message: string | null;
  code: [] | null;
  openModalUpdateCode: boolean;
}

export const initialCodeState: CodeStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  code: null,
  openModalUpdateCode: false,
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
    },
    setOpenUpdateCodeModal: (state, { payload }: any) => {
      state.openModalUpdateCode = true;
      state.code = payload;
    },
    setCloseUpdateCodeModal: (state) => {
      state.openModalUpdateCode = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
        (action: any) => action.type.endsWith("/rejected"),
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data.message;
        }
      );
  },
});

export const codeReducer = codeSlice.reducer as Reducer<CodeStatePayload>;

export const {
  resetCodeSuccess,
  resetCodeError,
  setOpenUpdateCodeModal,
  setCloseUpdateCodeModal,
} = codeSlice.actions;
