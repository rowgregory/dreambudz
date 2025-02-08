import { Reducer, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";

export interface ProductStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  products: [] | null;
  product: {};
  openModalCreateProduct: boolean;
  openModalUpdateProduct: boolean;
}

export const initialProductState: ProductStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  products: null,
  product: {},
  openModalCreateProduct: false,
  openModalUpdateProduct: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    resetProductSuccess: (state) => {
      state.success = false;
    },
    resetProductError: (state) => {
      state.error = null;
      state.message = null;
    },
    setOpenCreateProductModal: (state) => {
      state.openModalCreateProduct = true;
    },
    setCloseCreateProductModal: (state) => {
      state.openModalCreateProduct = false;
    },
    setOpenUpdateProductModal: (state, { payload }: any) => {
      state.openModalUpdateProduct = true;
      state.product = payload;
    },
    setCloseUpdateProductModal: (state) => {
      state.openModalUpdateProduct = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints.createProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
        }
      )
      .addMatcher(
        productApi.endpoints.updateProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
          state.success = true;
        }
      )
      .addMatcher(
        productApi.endpoints.fetchProducts.matchFulfilled,
        (state: any, { payload }: any) => {
          state.products = payload.products;
        }
      )
      .addMatcher(
        productApi.endpoints.getProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.product = payload.product;
        }
      )
      .addMatcher(
        productApi.endpoints.deleteProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        (action: any) =>
          action.type.endsWith("/rejected") &&
          action.payload?.data?.sliceName === "productApi",
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const productReducer =
  productSlice.reducer as Reducer<ProductStatePayload>;

export const {
  resetProductSuccess,
  resetProductError,
  setOpenCreateProductModal,
  setCloseCreateProductModal,
  setOpenUpdateProductModal,
  setCloseUpdateProductModal,
} = productSlice.actions;
