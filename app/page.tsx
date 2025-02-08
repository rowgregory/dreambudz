'use client'

import { useState } from 'react'
import { useAppDispatch } from './redux/store'
import { resetCodeSuccess } from './redux/features/codeSlice'
import AwesomeIcon from './components/common/AwesomeIcon'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import LoginLogoSVG from '@/public/svg/LoginLogoSVG'
import Link from 'next/link'
import PublicCodeForm from './forms/PublicCodeForm'

const LockScreen = () => {
  const dispatch = useAppDispatch()
  const [consent, setConsent] = useState(false)

  return (
    <div className="flex flex-col min-h-dvh md:justify-center md:items-center">
      <div className="md:max-w-[600px] w-full h-full md:max-h-[600px] flex flex-col py-7 md:py-12 px-3 md:px-20 items-center justify-center md:aspect-square md:shadow-shadow1 md:rounded-[32px]">
        <LoginLogoSVG />
        {consent ? (
          <section className="w-full max-w-sm mt-2 relative flex flex-col gap-y-3">
            <h1 className="text-2xl text-center text-white mt-5 mb-7 font-bold">Are you at least 21 years old?</h1>
            <div className="flex items-center justify-center gap-x-8">
              <AwesomeIcon
                onClick={() => {
                  dispatch(resetCodeSuccess())
                  setConsent(false)
                }}
                icon={faThumbsDown}
                className="text-zinc-400 w-5 h-5 duration-200 hover:text-red-400 cursor-pointer"
              />
              <Link href="/products" className="">
                <AwesomeIcon icon={faThumbsUp} className="text-zinc-400 w-5 h-5 duration-200 hover:text-lime-400" />
              </Link>
            </div>
          </section>
        ) : (
          <PublicCodeForm setConsent={setConsent} />
        )}
      </div>
    </div>
  )
}

export default LockScreen
