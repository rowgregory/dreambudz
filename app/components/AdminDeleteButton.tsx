import React from 'react'
import AwesomeIcon from './common/AwesomeIcon'
import Spinner from './common/Spinner'
import { trashIcon } from '../icons'

const AdminDeleteButton = ({ handleDelete, loading }: any) => {
  return (
    <button
      disabled={loading}
      onClick={handleDelete}
      className="bg-[#401C1C] rounded-md w-8 h-8 flex items-center justify-center aspect-square group hover:bg-[#471e1e] duration-200"
    >
      {loading ? (
        <Spinner fill="fill-lime-400" wAndH="w-3 h-3" />
      ) : (
        <AwesomeIcon icon={trashIcon} className="text-red-700 text-xs group-hover:text-red-600 duration-200" />
      )}
    </button>
  )
}

export default AdminDeleteButton
