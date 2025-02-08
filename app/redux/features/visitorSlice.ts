import { Reducer, createSlice } from "@reduxjs/toolkit";
import { visitorApi } from "../services/visitorApi";

export interface VisitorStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null | {} | any;
  message: string | null;
  visitors: [] | null;
  openDrawerProductDetails: boolean;
  product: any;
}

export const initialVisitorState: VisitorStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  visitors: null,
  openDrawerProductDetails: false,
  product: null,
};

export const visitorSlice = createSlice({
  name: "visitor",
  initialState: initialVisitorState,
  reducers: {
    resetVisitorSuccess: (state) => {
      state.success = false;
      state.visitors = null;
      state.message = null;
    },
    resetVisitorError: (state) => {
      state.error = null;
    },
    setVisitors: (state, { payload }: any) => {
      state.visitors = payload;
    },
    setOpenDrawerProductDetails: (state, { payload }: any) => {
      state.openDrawerProductDetails = true;
      state.product = payload;
    },
    setCloseDrawerProductDetails: (state) => {
      state.openDrawerProductDetails = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addMatcher(
        visitorApi.endpoints.fetchVisitors.matchFulfilled,
        (state: any, { payload }: any) => {
          state.visitors = payload.visitors;
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

export const visitorReducer =
  visitorSlice.reducer as Reducer<VisitorStatePayload>;

export const {
  resetVisitorSuccess,
  resetVisitorError,
  setVisitors,
  setOpenDrawerProductDetails,
  setCloseDrawerProductDetails,
} = visitorSlice.actions;
