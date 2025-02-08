import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseDrawerProductDetails } from '../redux/features/visitorSlice'
import { timesIcon } from '../icons'
import AwesomeIcon from './common/AwesomeIcon'
import Picture from './common/Picture'

const PublicProductDrawer = () => {
  const dispatch = useAppDispatch()
  const { product, openDrawerProductDetails } = useAppSelector((state: RootState) => state.visitor)

  if (!product) return

  return (
    <div className="overflow-x-hidden">
      <div
        className={`fixed inset-0 px-4 bg-[#0f0f0f] text-white z-30 w-full duration-500 h-dvh ease-in-out
      ${openDrawerProductDetails ? 'w-screen translate-x-0' : '-translate-x-full'} overflow-x-hidden overflow-y-auto`}
      >
        <Picture src="/images/modalbg.png" className="absolute inset-0 z-10 w-full h-full object-cover" priority={false} />
        <div className="max-w-screen-md pt-4 flex justify-center flex-col items-center w-full mx-auto relative z-20">
          <AwesomeIcon
            onClick={() => dispatch(setCloseDrawerProductDetails())}
            icon={timesIcon}
            className="flex self-start w-4 h-4 text-white cursor-pointer hover:rotate-90 duration-500 origin-center"
          />
          <Picture src={product?.image} className="mt-12 w-full h-full object-contain aspect-video bg-charcoal" priority={false} />
          <div className="flex flex-col sm:flex-row mt-10 mb-4">
            <h1 className="flex-1 text-white text-3xl font-bold">{product?.productName}</h1>
            <div className="flex-1 flex flex-col">
              <p className="text-ash leading-loose font-medium mb-4">{product?.description}</p>
              <button
                className="bg-charcoal duration-200 hover:bg-cinder text-ash px-10 py-1.5 w-fit"
                onClick={() => dispatch(setCloseDrawerProductDetails())}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicProductDrawer
