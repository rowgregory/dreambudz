import React from 'react'
import Spinner from './Spinner'

const AdminLoading = () => {
  return (
    <div className="overflow-hidden">
      <div className="bg-transparent fixed w-full inset-0 flex items-center justify-center z-[70]">
        <Spinner wAndH="w-10 h-10" />
      </div>
    </div>
  )
}

export default AdminLoading
