'use client'

import { useFetchProductsQuery } from '@/app/redux/services/productApi'
import ProductsPageBanner from '../components/ProductsPageBanner'
import ProductsPageStoryBlock from '../components/ProductsPageStoryBlock'
import ProductsPageInventoryBlock from '../components/ProductsPageInventoryBlock'
import Footer from '../components/Footer'
import PublicProductDrawer from '../components/PublicProductDrawer'

const Products = () => {
  const { data, isLoading } = useFetchProductsQuery()

  if (isLoading) return

  return (
    <>
      <PublicProductDrawer />
      <div className="overflow-x-hidden">
        <ProductsPageBanner />
        <ProductsPageStoryBlock />
        <ProductsPageInventoryBlock data={data} />
        <Footer />
      </div>
    </>
  )
}

export default Products
