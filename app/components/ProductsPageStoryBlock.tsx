import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import DividerSVG from '@/public/svg/DividerSVG'

const ProductsPageStoryBlock = () => {
  const { scrollY } = useScroll()
  const SECTION_HEIGHT = 1200
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, -100], [1, 0])
  const rotate = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ['0deg', '-15deg'])
  const largeTextTranslateX = useTransform(scrollY, [SECTION_HEIGHT, 50], [-500, 0])

  return (
    <section className="px-3 relative h-[1200px] bg-charcoal">
      <motion.div
        style={{ opacity, rotate, transformOrigin: 'bottom center', backgroundImage: `url("/images/story2.png")` }}
        className="h-[1100px] w-full bottom-0 lg:top-20 -right-40 absolute bg-no-repeat bg-center lg:bg-right bg-cover lg:bg-contain"
      />
      <motion.h3
        style={{ translateX: largeTextTranslateX }}
        className="text-[#282a2c] absolute mx-auto top-0 z-10 uppercase text-[140px] tracking-wide font-black whitespace-nowrap"
      >
        Indulge. Elevate. Enjoy.
      </motion.h3>
      <div className="flex pt-60 h-full mx-auto w-full max-w-md sm:max-w-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl">
        <div className="relative z-20 flex flex-col max-w-[500px]">
          <h1 className="text-15 uppercase text-[#7da133] font-semibold tracking-widest mb-4">Our Story</h1>
          <h2 className="text-[38px] font-bold text-white tracking-widest leading-snug uppercase mb-12">
            Best Kept Secret for Elevated Experiences
          </h2>
          <span className="w-32 h-[2px] bg-white mb-10"></span>
          <p className="text-xl tracking-wide text-[#a9a9a9] leading-relaxed">
            Dream Budz is a unique and carefully curated space where top-quality cannabis products and other items are available for those
            who know where to look. Our collection includes a variety of products that can elevate your experience, whether for relaxation,
            creativity, or wellness. Every item is handpicked with care to ensure you receive only the best. At Dream Budz, we believe in
            providing a seamless, discreet, and enjoyable experience for those who seek the finest products, with a touch of mystery and
            exclusivity.
          </p>
        </div>
      </div>
      <DividerSVG />
    </section>
  )
}

export default ProductsPageStoryBlock
