'use client';

import ProductRow from './ProductRow';

const ProductsTable = ({
  filteredProducts,
  productToBeEdited,
  productMenuRef,
  setIdAndName,
  openModal,
  setProductToBeEdited,
}: any) => {
  return (
    <table className="w-full">
      <thead className="whitespace-nowrap px-4 pb-4 pt-2">
        <tr className="bg-zinc-900">
          <th className="px-4 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none">
            <div className="text-xs -mx-1.5 -my-1 w-fit px-1.5 py-1 flex flex-nowrap items-center gap-2">
              Name
            </div>
          </th>
          <th className="px-4 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none">
            <div className="text-xs flex flex-nowrap items-center gap-2">
              Quantity
            </div>
          </th>
          <th className="px-4 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none">
            <div className="text-xs flex flex-nowrap items-center gap-2">
              Date & Time
            </div>
          </th>
          <th>
            <div className="flex flex-nowrap items-center gap-2 invisible">
              ghosthead
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts?.map((product: any, i: number) => (
          <ProductRow
            key={i}
            product={product}
            productToBeEdited={productToBeEdited}
            productMenuRef={productMenuRef}
            setIdAndName={setIdAndName}
            openModal={openModal}
            setProductToBeEdited={setProductToBeEdited}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
