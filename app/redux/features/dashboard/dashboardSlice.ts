import { Reducer, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../../services/dashboardApi";

export interface DashboardStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  info: {
    productsCount: number;
    code: { updatedAt: string; code: string };
    createdAt: string;
  } | null;
}

export const initialDashboardState: DashboardStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  info: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    resetDashboardSuccess: (state) => {
      state.success = false;
    },
    resetDashboardError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dashboardApi.endpoints.getDashboardData.matchFulfilled,
        (state: any, { payload }: any) => {
          state.info = payload.info;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "dashboardApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const dashboardReducer =
  dashboardSlice.reducer as Reducer<DashboardStatePayload>;

export const { resetDashboardSuccess, resetDashboardError } =
  dashboardSlice.actions;
