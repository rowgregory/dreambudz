'use client'

import React, { FC, useEffect } from 'react'
import ProgressBar from './components/common/ProgressBar'
import { ClientPageProps } from './types/common.types'
import { useAppDispatch } from './redux/store'
import { setAuthState } from './redux/features/authSlice'

const PageWrapper: FC<ClientPageProps> = ({ children, data }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthState(data))
  }, [dispatch, data])

  return (
    <>
      <ProgressBar />
      <div className="bg-deepslate min-h-dvh text-zinc-200">{children}</div>
    </>
  )
}

export default PageWrapper
