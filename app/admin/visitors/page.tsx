'use client'

import React, { FC } from 'react'
import AdminCommandArea from '@/app/components/AdminCommandArea'
import AdminErrorText from '@/app/components/AdminErrorText'
import { useFetchVisitorsQuery } from '@/app/redux/services/visitorApi'
import { formatDateWithTimezone } from '@/app/utils/date.functions'
import AdminLoading from '@/app/components/common/AdminLoading'

const VisitorRow: FC<{ visitor: any }> = ({ visitor }) => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-10 md:col-span-2 lg:col-span-1">{visitor?.browser}</div>
      <div className="col-span-10 md:col-span-2 lg:col-span-1">{visitor?.device}</div>
      <div className="col-span-10 md:col-span-5 lg:col-span-2">{formatDateWithTimezone(visitor?.createdAt)}</div>
      <div className="col-span-10 md:col-span-5 lg:col-span-3">{visitor?.id}</div>
      <div className="col-span-10 md:col-span-5 lg:col-span-3">{visitor?.ip}</div>
    </div>
  )
}

const Visitors = () => {
  const { isLoading, data, error } = useFetchVisitorsQuery()

  return (
    <>
      <AdminCommandArea type="VISITORS" />
      {isLoading ? (
        <AdminLoading />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="flex flex-col gap-y-10 animate-fadeIn">
          {data?.visitors?.map((visitor: any) => (
            <VisitorRow key={visitor.id} visitor={visitor} />
          ))}
        </div>
      )}
    </>
  )
}

export default Visitors
