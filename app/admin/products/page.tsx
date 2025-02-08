'use client'

import { useFetchProductsQuery } from '@/app/redux/services/productApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminProductCard from '@/app/components/AdminProductCard'
import AdminCommandArea from '@/app/components/AdminCommandArea'
import AdminErrorText from '@/app/components/AdminErrorText'
import AdminProductCreateModal from '@/app/modals/AdminProductCreateModal'
import AdminProductUpdateModal from '@/app/modals/AdminProductUpdateModal'
import Spinner from '@/app/components/common/Spinner'

const Products = () => {
  const { isLoading, data, error } = useFetchProductsQuery()
  const { openModalCreateProduct, openModalUpdateProduct } = useAppSelector((state: RootState) => state.product)

  return (
    <>
      {openModalCreateProduct && <AdminProductCreateModal />}
      {openModalUpdateProduct && <AdminProductUpdateModal />}
      <AdminCommandArea type="PRODUCTS" btnText="Create Product" />
      {isLoading ? (
        <div className="overflow-hidden">
          <div className={`bg-transparent fixed w-full inset-0 flex items-center justify-center z-[70]`}>
            <Spinner wAndH="w-10 h-10" fill="fill-lime-400" />
          </div>
        </div>
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-8 480:gap-8 animate-fadeIn">
          {data?.products?.map((product: any) => (
            <AdminProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default Products
