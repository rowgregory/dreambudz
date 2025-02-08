import { api } from "./api";

const BASE_URL = "/dashboard";

export const dashboardApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    fetchDashboardDetails: build.query({
      query: () => `${BASE_URL}/fetch-dashboard-details`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useFetchDashboardDetailsQuery } = dashboardApi;
