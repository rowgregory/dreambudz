import React from 'react'
import Spinner from './common/Spinner'

const AdminFormFooter = ({ reset, isUpdating, type, loading, error }: any) => (
  <div className="bg-[#161616] md:rounded-2xl lg:rounded-tl-none lg:rounded-tr-none gap-y-6 480:gap-y-0 py-6 px-5 flex flex-col 480:flex-row items-center justify-between mx-auto w-full max-w-md lg:max-w-full">
    <button
      onClick={reset}
      type="button"
      className="order-2 md:order-1 bg-[#333336] hover:bg-[#38383c] px-5 py-3 md:py-1.5 rounded-lg text-white w-full 480:w-36"
    >
      Back
    </button>
    <div className="order-1 md:order-2 flex items-center gap-x-3 w-full 480:w-fit">
      {loading && <Spinner fill="fill-lime-500" wAndH="w-4 h-4" />}
      {error && <div className="text-red-500 text-[10px]">{error}</div>}
      <button
        disabled={loading}
        type="submit"
        className="bg-lime-500 hover:bg-lime-600 px-5 py-3 md:py-1.5 rounded-lg text-white disabled:cursor-not-allowed disabled:bg-lime-700 flex gap-x-2 items-center w-full 480:w-fit justify-center duration-300"
      >
        {isUpdating ? 'Update' : 'Create'} {type}
      </button>
    </div>
  </div>
)

export default AdminFormFooter
