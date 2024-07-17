'use client';

import DeleteModal, {
  useDeleteModal,
} from '@/app/components/common/DeleteModal';
import Spinner from '@/app/components/common/Spinner';
import ProductsTable from '@/app/redux/features/product/components/ProductsTable';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/app/redux/services/productApi';
import { RootState, useAppSelector } from '@/app/redux/store';
import useOutsideDetect from '@/app/utils/useOutsideDetect';
import MagnifyingGlass from '@/public/svg/MagnifyingGlass';
import Link from 'next/link';
import { Fragment, useCallback, useRef, useState } from 'react';

const Products = () => {
  const [text, setText] = useState('');
  const [idAndNameAndFileName, setIdAndNameAndFileName] = useState({ id: '', name: '', fileName: '' });
  const products = useAppSelector((state: RootState) => state.product.products);
  const noProducts = products?.length === 0;
  const [productToBeEdited, setProductToBeEdited] = useState({
    open: false,
    product: { id: null, productName: null },
  });
  const productMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const { isLoading } = useGetProductsQuery();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const filteredProducts = products?.filter((product: any) =>
    product?.productName.toLowerCase().includes(text.toLowerCase())
  );

  const closeActionMenu = useCallback(() => {
    setProductToBeEdited({
      open: false,
      product: { id: null, productName: null },
    });
  }, []);

  useOutsideDetect(productMenuRef, closeActionMenu);

  return (
    <Fragment>
      <DeleteModal
        idAndNameAndFileName={idAndNameAndFileName}
        deleteDocument={deleteProduct}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      <div className="min-h-screen w-full mx-auto py-12 md:pt-16 px-[10px] sm:px-[16px] md:px-8">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner fill="fill-lime-400" wAndH="w-10 h-10" />
          </div>
        ) : (
          <Fragment>
            <div className="font-Matter-Medium text-xl mb-3.5">Products</div>
            <div className="flex justify-between">
              <div className="flex items-center font-Matter-Light border border-zinc-800 py-2 px-[16px] ">
                <MagnifyingGlass />
                <input
                  onChange={(e: any) => setText(e.target.value)}
                  className="w-full h-full focus:outline-0 ml-2 bg-transparent text-xs"
                  placeholder="Search"
                />
              </div>
              <Link
                href={{
                  pathname: '/admin/product',
                  query: { isEditMode: false },
                }}
                className="whitespace-nowrap w-fit px-4 duration-200 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-lime-600 text-xs text-white py-2 hover:bg-lime-500"
              >
                Add product
              </Link>
            </div>
            <div className="bg-zinc-900 mt-3">
              {noProducts ? (
                <div className="flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10">
                  <div className=" bg-zinc-800 h-12 w-12 flex justify-center items-center">
                    <MagnifyingGlass />
                  </div>
                  <div className="text-xs my-2">No products</div>
                </div>
              ) : (
                <ProductsTable
                  filteredProducts={filteredProducts}
                  productToBeEdited={productToBeEdited}
                  productMenuRef={productMenuRef}
                  setIdAndNameAndFileName={setIdAndNameAndFileName}
                  openModal={openModal}
                  setProductToBeEdited={setProductToBeEdited}
                />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Products;
