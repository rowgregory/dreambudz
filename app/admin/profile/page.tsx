'use client'

import React, { FormEvent } from 'react'
import AdminCommandArea from '@/app/components/AdminCommandArea'
import AdminErrorText from '@/app/components/AdminErrorText'
import Spinner from '@/app/components/common/Spinner'
import useForm from '@/app/hooks/useForm'
import { useFetchUserQuery, useUpdateUserMutation } from '@/app/redux/services/userApi'
import validateProfileUsernameForm from '@/app/validations/validateProfileUsernameForm'
import { ADMIN_PROFILE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import { failSE, levelUpSE } from '@/public/data/soundEffectPaths'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import AdminLoading from '@/app/components/common/AdminLoading'
import { RootState, useAppSelector } from '@/app/redux/store'
import { formatDateWithTimezone } from '@/app/utils/date.functions'

const Profile = () => {
  const [updateUser, { isLoading, error: errorUpdate }] = useUpdateUserMutation()
  const { isLoading: loadingFetchingUser, error: errorFetch } = useFetchUserQuery()
  const user = useAppSelector((state: RootState) => state.user)
  const { inputs, handleInput } = useForm(ADMIN_PROFILE_INITIAL_FIELDS, validateProfileUsernameForm, user?.user)

  const { play: errorSE } = useSoundEffect(failSE, true)
  const { play: successSE } = useSoundEffect(levelUpSE, true)

  const handleUpdateUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await updateUser({ username: inputs.username }).unwrap()
      successSE()
    } catch (error) {
      errorSE()
    }
  }

  return (
    <>
      <AdminCommandArea type="PROFILE" />
      {loadingFetchingUser ? (
        <AdminLoading />
      ) : errorFetch?.data?.message ? (
        <AdminErrorText error={errorFetch?.data?.message} />
      ) : (
        <form onSubmit={handleUpdateUsername} className="w-full md:w-1/3 flex flex-col gap-y-2.5 animate-fadeIn">
          <input
            name="username"
            placeholder="Username"
            onChange={handleInput}
            value={inputs.username || ''}
            className="admin-code-page bg-transparent w-full h-12 border-b-2 border-b-lime-600 focus:outline-none"
            aria-label="Username"
          />
          <div className="flex items-center self-end gap-x-2">
            {isLoading && <Spinner wAndH="w-4 h-4" fill="fill-lime-400" />}
            {errorUpdate?.data?.message ? (
              <div className="text-red-400 text-sm">{errorUpdate?.data?.message}</div>
            ) : (
              <div className="text-[11px] text-zinc-500">{formatDateWithTimezone(user?.user?.updatedAt)}</div>
            )}
            <button className="text-zinc-300 bg-zinc-700 px-5 py-1.5 w-fit" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default Profile
