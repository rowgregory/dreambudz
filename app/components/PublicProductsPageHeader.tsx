import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AwesomeIcon from './common/AwesomeIcon'
import { dashboardIcon, signOutAltIcon } from '../icons'
import Spinner from './common/Spinner'
import { useLogoutMutation } from '../redux/services/authApi'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '../redux/store'

const PublicProductsPageHeader = () => {
  const [logout, { isLoading: loadingLogout, error: errorLogout }] = useLogoutMutation()
  const { push } = useRouter()
  const { isAdmin } = useAppSelector((state: RootState) => state.auth)

  const handleLogout = async (e: any) => {
    e.preventDefault()
    await logout().unwrap()
    push('/')
  }

  return (
    <>
      <motion.div
        style={{ backgroundImage: `url("/images/bannerbg.png")` }}
        className=" h-[830px] lg:h-[1200px] bg-cover w-full object-cover top-0 absolute bg-no-repeat"
      />
      <h1 className="absolute top-3 left-3 md:top-12 md:left-12 font-black text-white text-4xl">DB.</h1>
      {isAdmin ? (
        <Link href="/admin/dashboard">
          <AwesomeIcon
            icon={dashboardIcon}
            className="w-9 h-9 text-white absolute top-3 right-3 md:top-12 md:right-12 hover:text-[#7ea032] duration-200 cursor-pointer"
          />
        </Link>
      ) : loadingLogout ? (
        <div className="absolute top-3 right-3 md:top-12 md:right-12">
          <Spinner wAndH="w-9 h-9" fill="fill-[#7ea032]" />
        </div>
      ) : (
        !isAdmin && (
          <AwesomeIcon
            onClick={handleLogout}
            icon={signOutAltIcon}
            className="w-9 h-9 text-white absolute top-3 right-3 md:top-12 md:right-12 hover:text-[#7ea032] duration-200 cursor-pointer"
          />
        )
      )}
      {errorLogout?.data?.message && (
        <div className="text-red-500 text-sm absolute whitespace-nowrap right-12 top-24">{errorLogout?.data?.message}</div>
      )}
    </>
  )
}

export default PublicProductsPageHeader
