'use client'

import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React, { FC, ReactNode } from 'react'

const AdminModal: FC<{ show: boolean; children: ReactNode }> = ({ show, children }) => {
  useRemoveScroll(true)

  return (
    <div
      className={`fixed inset-0 lg:bg-black/70 flex z-50 lg:px-4 justify-center lg:items-center duration-100 transition-opacity ease-out ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className="bg-deepslate lg:rounded-2xl transform lg:h-auto w-screen lg:w-[690px] lg:max-h-[90vh] overflow-auto h-sm:h-[calc(100vh-50px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminModal
