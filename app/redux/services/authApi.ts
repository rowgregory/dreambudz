import { api } from "./api";

const BASE_URL = "/auth";

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/register`,
        method: "POST",
        body,
      }),
    }),
    login: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        body,
      }),
    }),
    verifyRegisterCode: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/verify-register-code`,
        method: "POST",
        body,
      }),
    }),
    verifyVisitorCode: build.mutation({
      query: (code: any) => ({
        url: `${BASE_URL}/verify-visitor-code`,
        method: "POST",
        body: code,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useVerifyVisitorCodeMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyRegisterCodeMutation,
  useLogoutMutation,
} = authApi;
