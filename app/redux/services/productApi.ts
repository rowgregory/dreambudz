import { api } from "./api";

const BASE_URL = "/product";

export const productApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    createProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/create-product`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    updateProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/update-product`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    fetchProducts: build.query({
      query: () => `${BASE_URL}/fetch-products`,
      providesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (productId: string) =>
        `${BASE_URL}/fetch-product-by-id/${productId}`,
      providesTags: (_result: any, _error: any, arg: any) => [
        { type: "Product", id: arg },
      ],
    }),
    deleteProduct: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-product`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useFetchProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
} = productApi;
