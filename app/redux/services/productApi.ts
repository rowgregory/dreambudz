import { api } from "./api";

const BASE_URL = "/product";

export const productApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    createProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}?endpoint=CREATE_PRODUCT`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    updateProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}?endpoint=UPDATE_PRODUCT`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    getProducts: build.query({
      query: () => `${BASE_URL}?endpoint=FETCH_PRODUCTS`,
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (productId: string) =>
        `${BASE_URL}/${productId}?endpoint=FETCH_PRODUCT`,
      providesTags: (_result: any, _error: any, arg: any) => [
        { type: "Product", id: arg },
      ],
    }),
    deleteProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}?endpoint=DELETE_PRODUCT`,
        method: "DELETE",
        body: product.id,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
} = productApi;
