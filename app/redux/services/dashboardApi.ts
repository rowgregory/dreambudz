import { api } from "./api";

const BASE_URL = "/dashboard";

export const dashboardApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getDashboardData: build.query({
      query: () => `${BASE_URL}?endpoint=DASHBOARD`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
