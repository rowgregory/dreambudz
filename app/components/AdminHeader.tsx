'use client'

import React, { FormEvent } from 'react'
import { useLogoutMutation } from '@/app/redux/services/authApi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Spinner from './common/Spinner'
import AwesomeIcon from './common/AwesomeIcon'
import { signOutAltIcon } from '../icons'
import { login } from '@/public/data/paths'

const AdminHeader = () => {
  const [logout, { isLoading, error }] = useLogoutMutation()
  const { push } = useRouter()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    await logout().unwrap()
    push(login)
  }

  return (
    <header className="sticky top-0 z-50 px-4 w-full bg-[#323235] h-12 flex items-center justify-between">
      <Link href="/products" className="font-rubik font-semibold">
        Dream Budz
      </Link>
      <div className="flex items-center gap-x-4">
        {error?.data?.message && <div className="text-13 text-red-500">{error?.data?.message}</div>}
        <button disabled={isLoading} onClick={handleLogout}>
          {isLoading ? <Spinner wAndH="w-3 h-3" fill="fill-lime-400" /> : <AwesomeIcon icon={signOutAltIcon} className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
