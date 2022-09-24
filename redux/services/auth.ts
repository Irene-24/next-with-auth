import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LoginBody, RefreshBody, AuthResp } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  endpoints: (build) => ({
    login: build.mutation<AuthResp, LoginBody>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: build.mutation<AuthResp, RefreshBody | void>({
      query: (credentials) => ({
        url: "/refresh",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation<void, string>({
      query: (userId) => ({
        url: "/logout",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApi;

export { authApi };
