import { api } from "./api";

const BASE_URL = "/user";

type User = {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: string; // or Date if parsing it into a Date object
  updatedAt: string; // or Date if parsing it into a Date object
};

export const userApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    updateUser: build.mutation({
      query: (user: User) => ({
        url: `${BASE_URL}/update-user`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    fetchUser: build.query({
      query: () => `${BASE_URL}/fetch-user`,
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateUserMutation, useFetchUserQuery } = userApi;
