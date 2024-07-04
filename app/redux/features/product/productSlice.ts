import { Reducer, createSlice } from '@reduxjs/toolkit';
import { productApi } from '../../services/productApi';

export interface ProductStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message: string | null;
  products: [] | null;
  product: {} | null;
}

export const initialProductState: ProductStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: null,
  products: null,
  product: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    resetProductSuccess: (state) => {
      state.success = false;
    },
    resetProductError: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints.createProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        productApi.endpoints.updateProduct.matchFulfilled,
        (state: any, { payload }: any) => {
          state.message = payload.message;
        }
      )
      .addMatcher(
        productApi.endpoints.getProducts.matchFulfilled,
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
          action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'productApi',
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.payload.data;
        }
      );
  },
});

export const productReducer = productSlice.reducer as Reducer<ProductStatePayload>;

export const { resetProductSuccess, resetProductError } = productSlice.actions;
