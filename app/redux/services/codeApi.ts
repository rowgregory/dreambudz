import { api } from "./api";

const BASE_URL = "/code";

export const codeApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    createCode: build.mutation({
      query: (code: any) => ({
        url: `${BASE_URL}/create-code`,
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["Code", "Dashboard"],
    }),
    updateCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/update-code`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Code", "Dashboard"],
    }),
    getCode: build.query({
      query: () => `${BASE_URL}/fetch-code`,
      providesTags: ["Code"],
    }),
  }),
});

export const { useCreateCodeMutation, useUpdateCodeMutation, useGetCodeQuery } =
  codeApi;
