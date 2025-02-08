'use client'

import React, { FC, useRef } from 'react'
import Link from 'next/link'
import { ChildrenProps } from '../types/common.types'
import useCustomPathname from '../hooks/useCustomPathname'
import adminSideNavigationLinkData from '@/public/data/adminSideNavigationLinkData'

const NavigationLayout: FC<ChildrenProps> = ({ children }) => {
  const path = useCustomPathname()
  const navRef = useRef<HTMLDivElement>(null)
  const items = adminSideNavigationLinkData(path)

  return (
    <div className="relative">
      <nav
        ref={navRef}
        className="hidden md:flex items-center overflow-x-auto admin-navigation border-b-1 border-[#6a6a6a] border-opacity-40 relative"
      >
        <div className="flex gap-x-16">
          {items?.map((link, i) => (
            <Link
              key={i}
              href={link.linkKey}
              className={`py-2.5 flex items-center justify-center gap-x-2 whitespace-nowrap border-b-2 ${
                link.isActive ? 'border-lime-400' : 'border-transparent'
              }`}
            >
              <span className={`text-xl ${link.isActive ? 'text-white' : 'text-[#6a6a6a] focus:text-white active:text-white'}`}>
                {link.textKey}
              </span>
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}

export default NavigationLayout
