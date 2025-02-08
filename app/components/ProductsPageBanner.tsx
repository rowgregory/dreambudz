import React from 'react'
import PublicProductsPageHeader from './PublicProductsPageHeader'
import BannerLogoSVG from '@/public/svg/BannerLogoSVG'
import DownArrowSVG from '@/public/svg/DownArrowSVG'
import DividerSVG from '@/public/svg/DividerSVG'

const ProductsPageBanner = () => {
  return (
    <section className="bg-black relative h-[830px] lg:h-[1200px]">
      <PublicProductsPageHeader />
      <div className="flex pt-20 h-full justify-start lg:justify-end mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl">
        <div className="relative z-20 flex flex-col">
          <div className="w-80 h-80 sm:w-96 sm:h-96 md:h-[500px] md:w-[500px]">
            <BannerLogoSVG />
          </div>
          <h2 className="text-[22px] text-white ml-3 -mt-6">A hidden haven for top-shelf goods</h2>
        </div>
      </div>
      <div className="animate-gravity absolute left-1/2 -translate-x-1/2 bottom-40">
        <DownArrowSVG />
      </div>
      <DividerSVG fill="#161616" />
    </section>
  )
}

export default ProductsPageBanner
