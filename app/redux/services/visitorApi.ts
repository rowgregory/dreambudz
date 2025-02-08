import { api } from "./api";

const BASE_URL = "/visitor";

export const visitorApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    fetchVisitors: build.query({
      query: () => `${BASE_URL}/fetch-visitors`,
      providesTags: ["Visitor"],
    }),
  }),
});

export const { useFetchVisitorsQuery } = visitorApi;
