"use client";

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const fetchFn = async (
  url: RequestInfo,
  options?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response; // Return the response directly
  } catch (error) {
    console.error("Error in fetchFn:", error);
    throw error; // Propagate error
  }
};
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  fetchFn,
  // credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      (headers as Headers).set("Authorization", `Bearer ${token}`);
      (headers as Headers).set("Content-Type", "application/json");
    }
    return headers;
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Auth", "Code", "Product", "Dashboard"],
  endpoints: () => ({}),
}) as any;
