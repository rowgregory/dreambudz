'use client'

import AdminErrorText from './AdminErrorText'
import { useDeleteProductMutation } from '../redux/services/productApi'
import { FC, useState } from 'react'
import { useAppDispatch } from '../redux/store'
import { setOpenUpdateProductModal } from '../redux/features/productSlice'
import Picture from './common/Picture'
import { truncateString } from '../utils/string.funcs'
import AdminDeleteButton from './AdminDeleteButton'

const AdminProductCard: FC<{ product: any }> = ({ product }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteProduct, { error }] = useDeleteProductMutation()

  const handleDelete = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [product?.id]: true }))

    await deleteProduct({ id: product?.id, fileName: product?.fileName, mimeType: 'image' }).unwrap()

    setLoading((prev) => ({ ...prev, [product?.id]: false }))
  }

  const handleEdit = (e: any) => {
    e.preventDefault()
    dispatch(setOpenUpdateProductModal(product))
  }

  return (
    <div
      onClick={handleEdit}
      className="shadow-shadow1 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 rounded-2xl relative cursor-pointer"
    >
      <div className="grid grid-cols-12 gap-x-4 bg-[#323235] rounded-tl-2xl rounded-tr-2xl p-5">
        <div className="col-span-12 480:col-span-3 w-full h-full mb-2 480:mb-0 aspect-video md:aspect-square rounded-xl flex items-center justify-center">
          <Picture
            src={product?.image || '/images/mj-1.png'}
            alt={product?.productName}
            className="w-full h-auto rounded-xl aspect-video md:aspect-square object-cover"
            priority={false}
          />
        </div>
        <div className="col-span-12 480:col-span-9 flex flex-col gap-y-1">
          <h1 className="text-white font-semibold text-2xl max-w-52 w-full truncate">{product?.productName}</h1>
          <div className={`${product.publish ? 'bg-lime-500' : 'bg-red-500'} w-3 h-3 rounded-full`} />
        </div>
      </div>
      <div className="p-5 flex flex-col gap-y-3">
        <p className="text-zinc-400 h-16">{truncateString(product?.description, 75)}</p>
        <div className="flex items-center justify-end gap-x-2">
          {error && <AdminErrorText error={error?.data?.message} />}
          <AdminDeleteButton handleDelete={handleDelete} loading={loading[product?.id]} />
        </div>
      </div>
    </div>
  )
}

export default AdminProductCard
