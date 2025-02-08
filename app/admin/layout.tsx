'use client'

import React, { FC } from 'react'
import AdminMobileNavigation from '../components/AdminMobileNavigation'
import AdminHeader from '../components/AdminHeader'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { barsIcon } from '../icons'
import { useAppDispatch } from '../redux/store'
import NavigationLayout from './navigation-layout'
import { ChildrenProps } from '../types/common.types'
import { setOpenAdminMobileNavigation } from '../redux/features/dashboardSlice'

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <AdminHeader />
      <AdminMobileNavigation />
      <main className="px-3 py-8 bg-[#1c1c1e] min-h-[calc(100dvh-48px)] relative">
        <AwesomeIcon
          onClick={() => dispatch(setOpenAdminMobileNavigation())}
          icon={barsIcon}
          className="w-5 h-4 text-white block md:hidden absolute top-4 left-4 cursor-pointer"
        />
        <div className="max-w-96 md:max-w-[690px] lg:max-w-[1035px] 2xl:max-w-[1380px] mx-auto w-full">
          <NavigationLayout>{children}</NavigationLayout>
        </div>
      </main>
    </>
  )
}

export default AdminLayout
