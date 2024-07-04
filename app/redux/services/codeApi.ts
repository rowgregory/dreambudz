import { api } from "./api";

const BASE_URL = "/code";

export const codeApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    verifyCode: build.mutation({
      query: (code: any) => ({
        url: `${BASE_URL}/verify?endpoint=VERIFY_CODE`,
        method: "POST",
        body: code,
      }),
    }),
    createCode: build.mutation({
      query: (code: any) => ({
        url: `${BASE_URL}?endpoint=CREATE_CODE`,
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["Code", "Dashboard"],
    }),
    updateCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}?endpoint=UPDATE_CODE`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Code", "Dashboard"],
    }),
    getCode: build.query({
      query: () => `${BASE_URL}?endpoint=FETCH_CODE`,
      providesTags: ["Code"],
    }),
  }),
});

export const {
  useVerifyCodeMutation,
  useCreateCodeMutation,
  useUpdateCodeMutation,
  useGetCodeQuery,
} = codeApi;
