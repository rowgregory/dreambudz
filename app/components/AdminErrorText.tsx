import React, { FC } from 'react'

const AdminErrorText: FC<{ error: string }> = ({ error }) => {
  return <div className="text-xs text-red-500">{error}</div>
}

export default AdminErrorText
