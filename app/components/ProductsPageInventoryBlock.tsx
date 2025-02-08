import React from 'react'
import Picture from './common/Picture'
import { useAppDispatch } from '../redux/store'
import { formatDateWithTimezone } from '../utils/date.functions'
import { setOpenDrawerProductDetails } from '../redux/features/visitorSlice'

const ProductsPageInventoryBlock = ({ data }: any) => {
  const dispatch = useAppDispatch()

  return (
    <section className="relative h-full min-h-[1000px]">
      <Picture src="/images/productbg.png" priority={true} className="h-full min-h-[1000px] w-full object-cover absolute" />
      <div className="flex justify-center px-3 py-48 h-full mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl">
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="text-[25px] uppercase text-white font-bold tracking-widest mb-4">Where Quality Meets Mystery</h1>
          <span className="w-32 h-[2px] bg-white mb-10 mx-auto"></span>
          <div className="grid grid-cols-12 gap-y-8 md:gap-8">
            {data?.products?.map(
              (product: any) =>
                product.publish && (
                  <div
                    onClick={() => dispatch(setOpenDrawerProductDetails(product))}
                    key={product?.id}
                    className="col-span-12 md:col-span-6 xl:col-span-4"
                  >
                    <Picture src={product?.image} className=" aspect-[16/10] w-full h-auto object-cover" priority={false} />
                    <div className="bg-[#232323] p-10">
                      <div className="flex items-center justify-between mb-6">
                        <h6 className="text-xs uppercase font-semibold text-[#ababab]">{formatDateWithTimezone(product?.createdAt)}</h6>
                      </div>
                      <h3 className="text-2xl text-white font-bold truncate">{product?.productName}</h3>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsPageInventoryBlock
