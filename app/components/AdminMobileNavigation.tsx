'use client'

import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import AwesomeIcon from './common/AwesomeIcon'
import { useLogoutMutation } from '../redux/services/authApi'
import { setCloseAdminMobileNavigation } from '../redux/features/dashboardSlice'
import { login } from '@/public/data/paths'
import Spinner from './common/Spinner'
import LoginLogoSVG from '@/public/svg/LoginLogoSVG'
import adminSideNavigationLinkData from '@/public/data/adminSideNavigationLinkData'
import useCustomPathname from '../hooks/useCustomPathname'

const AdminMobileNavigation = () => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { push } = useRouter()
  const { play } = useSoundEffect('/sound-effects/descend-musical-mallet.mp3', true)
  const { openAdminMobileNavigation } = useAppSelector((state: RootState) => state.dashboard)
  const [logout, { isLoading: loadingLogout, error: errorLogout }] = useLogoutMutation()
  const close = () => dispatch(setCloseAdminMobileNavigation())

  const handleLogout = async (e: any) => {
    e.preventDefault()
    await logout().unwrap()
    close()
    play()
    push(login)
  }

  return (
    <div
      className={`${
        openAdminMobileNavigation ? 'w-screen left-0 overflow-hidden' : 'left-[-100vw] w-none'
      } fixed duration-200 min-h-dvh bg-zinc-950 top-0 left-0 flex flex-col items-center pt-16 md:justify-center gap-5 z-[60]`}
    >
      <AwesomeIcon onClick={close} icon={faTimes} className="text-lime-400 top-4 right-4 absolute cursor-pointer" />
      <LoginLogoSVG />
      {adminSideNavigationLinkData(path).map((link: any, i: number) => (
        <Link
          key={i}
          href={link.linkKey}
          onClick={close}
          className={`${link.isActive ? 'text-lime-500' : ''} hover:text-lime-400 duration-200 font-medium`}
        >
          {link.textKey}
        </Link>
      ))}
      {loadingLogout ? (
        <Spinner />
      ) : (
        <Link onClick={handleLogout} className="hover:text-lime-400 duration-200" href="/auth/login">
          Logout
        </Link>
      )}
      {errorLogout?.data?.message && <div>{errorLogout?.data?.message}</div>}
    </div>
  )
}

export default AdminMobileNavigation
