import { api } from "./api";

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}?endpoint=REGISTER`,
        method: "POST",
        body,
      }),
    }),
    login: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}?endpoint=LOGIN`,
        method: "POST",
        body,
      }),
    }),
    verifyRegisterCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}?endpoint=VERIFY_REGISTER_CODE`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyRegisterCodeMutation,
} = authApi;
