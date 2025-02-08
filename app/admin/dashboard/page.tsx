'use client'

import { useState } from 'react'
import Spinner from '../../components/common/Spinner'
import { useFetchDashboardDetailsQuery } from '@/app/redux/services/dashboardApi'
import { faBoxOpen, faCodeCompare, faUser } from '@fortawesome/free-solid-svg-icons'
import AdminCommandArea from '@/app/components/AdminCommandArea'
import AdminErrorText from '@/app/components/AdminErrorText'
import DashboardBox from '@/app/components/DashboardBox'

const boxes = (data: any, showCode: boolean, setShowCode: (showCode: boolean) => void) => [
  {
    linkKey: '/admin/products',
    linkClassName:
      'col-span-12 md:col-span-6 h-40 bg-gradient-to-r from-sky-800 to-sky-300 rounded-sm px-8 py-5 cursor-pointer relative overflow-hidden flex flex-col justify-between',
    title: 'Products',
    value: data?.product?.productsCount,
    icon: faBoxOpen
  },
  {
    linkKey: '/admin/code',
    linkClassName:
      'col-span-12 md:col-span-6 h-40 bg-gradient-to-r from-indigo-800 to-indigo-300 rounded-sm px-8 py-5 cursor-pointer relative overflow-hidden flex flex-col justify-between',
    title: 'Code',
    value: showCode ? data?.code?.code : '****',
    icon: faCodeCompare,
    onClick: (e: any) => {
      e.stopPropagation()
      e.preventDefault()
      setShowCode(!showCode)
    }
  },
  {
    linkKey: '/admin/visitors',
    linkClassName:
      'col-span-12 md:col-span-6 h-40 bg-gradient-to-r from-teal-800 to-teal-300 rounded-sm px-8 py-5 cursor-pointer relative overflow-hidden flex flex-col justify-between',
    title: 'Visistors',
    value: data.visitor.total,
    last24Hours: data.visitor.last24Hours,
    lastWeek: data.visitor.lastWeek,
    icon: faUser
  }
]

const Dashboard = () => {
  const [showCode, setShowCode] = useState(false)
  const { isLoading, data, error } = useFetchDashboardDetailsQuery()

  return (
    <>
      <AdminCommandArea type="DASHBOARD" />
      {isLoading ? (
        <div className="overflow-hidden">
          <div className={`bg-transparent fixed w-full inset-0 flex items-center justify-center z-60`}>
            <Spinner wAndH="w-10 h-10" fill="fill-lime-400" />
          </div>
        </div>
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-8 480:gap-8 animate-fadeIn">
          {boxes(data, showCode, setShowCode)?.map((box: any, i: number) => (
            <DashboardBox key={i} box={box} isLoading={isLoading} />
          ))}
        </div>
      )}
    </>
  )
}

export default Dashboard
