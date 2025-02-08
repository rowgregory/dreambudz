'use client'

import { useAppDispatch } from '@/app/redux/store'
import React, { FC } from 'react'
import Link from 'next/link'
import ActionButton from './AdminActionButton'
import { setOpenCreateProductModal } from '../redux/features/productSlice'

const commandAreaText = {
  PRODUCTS: {
    title: 'Manage Products',
    p1: `This page allows you to manage the products available in the system. You can add new products by clicking on 'Create Product.' Each product can be edited, updated, or removed as needed. You can also view details for each product, such as price, description, and inventory status, ensuring the product catalog stays up to date and accessible.`,
    func: setOpenCreateProductModal()
  },
  DASHBOARD: {
    title: 'Dashboard',
    p1: `This page allows you to oversee and manage key aspects of the system. You can customize settings, track important metrics, and ensure everything runs smoothly. Use this space to access critical insights, update configurations, and maintain an organized workflow.`
  },
  CODE: {
    title: 'Manage Frontend Access',
    p1: `This page is where you can change the password required to access the frontend products. By updating the password here, you ensure that only authorized users can view and interact with the product pages. Make sure to choose a strong password and update it regularly for better security.`
  },
  VISITORS: {
    title: 'Visitors',
    p1: `This page displays a list of visitors who have accessed the products using the provided access code. It includes their unique ID and user agent details for tracking purposes.`
  },
  PROFILE: {
    title: 'Profile',
    p1: `This page allows you to update your username and password. Keeping your credentials up to date ensures secure access to your account. Be sure to choose a strong password and save any changes before leaving the page.`
  }
} as any

const AdminCommandArea: FC<{ type: string; btnText?: string }> = ({ type, btnText }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="py-9 480:py-14 w-full flex flex-col">
      <div className="flex flex-col lg:flex-row gap-y-16 lg:gap-x-16">
        <div className="flex flex-col w-full">
          <h1 className="text-5xl font-medium text-white mb-6">{commandAreaText[type].title}</h1>
          <p className="text-[#b0b0b2] font-light w-full md:w-2/3 text-17 mb-2">{commandAreaText[type].p1}</p>
          {commandAreaText?.[type]?.p2 && (
            <p className="text-[#b0b0b2] font-light w-full md:w-2/3 text-17 mb-2">{commandAreaText?.[type]?.p2}</p>
          )}
          {commandAreaText?.[type]?.func && btnText && <ActionButton text={btnText} onClick={() => dispatch(commandAreaText[type].func)} />}
          {commandAreaText?.[type]?.link && (
            <div className="flex flex-col md:flex-row md:items-center gap-x-2 mt-5">
              <h3 className="text-sm font-light text-[#b0b0b2] mb-2 md:mb-0">
                See how your {commandAreaText?.[type]?.title?.toLowerCase()} are displayed to customers on the public page.
              </h3>
              <Link href={commandAreaText?.[type]?.link} className={`font-light text-sm w-fit text-[#00c5d9]`}>
                View Public {commandAreaText?.[type]?.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCommandArea
