import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { timesIcon } from '@/app/icons'

const AdminModalClostBtn: FC<{ reset: (e: any) => void }> = ({ reset }) => {
  return <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
}

export default AdminModalClostBtn
