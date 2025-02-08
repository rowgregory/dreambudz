import { Reducer, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../services/dashboardApi";

export interface DashboardStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  openAdminMobileNavigation: boolean;
  code: string;
  productCount: number;
  last24Hours: any;
  lastWeek: any;
  total: any;
}

export const initialDashboardState: DashboardStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  openAdminMobileNavigation: false,
  code: "",
  productCount: 0,
  last24Hours: null,
  lastWeek: null,
  total: null,
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
    setOpenAdminMobileNavigation: (state) => {
      state.openAdminMobileNavigation = true;
    },
    setCloseAdminMobileNavigation: (state) => {
      state.openAdminMobileNavigation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dashboardApi.endpoints.fetchDashboardDetails.matchFulfilled,
        (state: any, { payload }: any) => {
          state.code = payload.code.code;
          state.productCount = payload.product.productCount;
          state.last24Hours = payload.visitor.last24Hours;
          state.lastWeek = payload.visitor.lastWeek;
          state.total = payload.visitor.total;
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

export const {
  resetDashboardSuccess,
  resetDashboardError,
  setCloseAdminMobileNavigation,
  setOpenAdminMobileNavigation,
} = dashboardSlice.actions;
