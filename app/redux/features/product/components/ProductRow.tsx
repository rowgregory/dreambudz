import { formatDateWithTimezone } from '@/app/utils/dateFunctions';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

const ProductRow = ({
  product,
  productToBeEdited,
  setIdAndNameAndFileName,
  openModal,
  setProductToBeEdited,
  productMenuRef,
}: any) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <tr className="bg-zinc-800 z-1 h-[3.25rem] group [&_td]:focus-within:bg-zinc-900 [&_td]:hover:bg-zinc-900 relative">
      <td className="px-2">
        <div className="m-0 w-full p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap">
          <div className="max-w-[15rem]">
            <span className="text-xs font-Matter-Regular truncate">
              {product?.productName}
            </span>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xs font-Matter-Regular items-center px-4 whitespace-nowrap">
          {product?.publish ? 'LIVE' : 'OFFLINE'}
        </p>
      </td>
      <td>
        <p className="text-xs font-Matter-Regular items-center px-4 whitespace-nowrap">
          {formatDateWithTimezone(product?.createdAt)}
        </p>
      </td>
      <td>
        {productToBeEdited.open &&
          productToBeEdited.product?.id === product?.id && (
            <div
              ref={productMenuRef}
              className="flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit bg-[#0f1119] -top-[44px] right-16 md:right-28"
            >
              <Link
                href={{
                  pathname: '/admin/product',
                  query: {
                    product: JSON.stringify(productToBeEdited.product),
                    isEditMode: true,
                  },
                }}
                className="flex w-full text-xs text-zinc-400 px-2 py-1 hover:no-underline hover:bg-zinc-700 hover:text-zinc-400"
              >
                Edit
              </Link>
              <Link
                href={{
                  pathname: `/code-validated/${token}/item`,
                  query: {
                    product: JSON.stringify(productToBeEdited.product),
                  },
                }}
                className="flex w-full text-xs text-zinc-400 px-2 py-1 hover:no-underline hover:bg-zinc-700 hover:text-zinc-400"
              >
                View
              </Link>
              <button
                onClick={() => {
                  setIdAndNameAndFileName({
                    id: product?.id,
                    name: product?.productName,
                    fileName: product?.fileName
                  });
                  openModal();
                }}
                className="flex w-full text-xs text-zinc-400 px-2 py-1 hover:no-underline hover:bg-zinc-700 hover:text-zinc-400"
              >
                Delete
              </button>
            </div>
          )}
        <div
          onClick={() => setProductToBeEdited({ open: true, product })}
          className="m-0 w-full border-0 p-0 items-center px-4 relative flex justify-center"
        >
          <button className="flex h-7 cursor-pointer items-center justify-center p-2 hover:bg-zinc-950 text-zinc-400">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
