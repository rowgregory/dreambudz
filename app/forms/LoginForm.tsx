'use client'

import React, { useState } from 'react'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '@/app/components/common/Spinner'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/app/redux/services/authApi'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import useForm from '@/app/hooks/useForm'
import { dashboard } from '@/public/data/paths'
import { LOGIN_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateLoginForm from '../validations/validateLoginForm'
import { failSE } from '@/public/data/soundEffectPaths'

const LoginForm = () => {
  const [type, setType] = useState(false)
  const { push } = useRouter()
  const [login, { isLoading, error, success }] = useLoginMutation()
  const { play: errorSE } = useSoundEffect(failSE, true)
  const { play: successSE } = useSoundEffect('/sound-effects/gain-access.mp3', true)
  const { inputs, handleInput, setErrors, errors, submitted, setSubmitted } = useForm(LOGIN_INITIAL_FIELDS, validateLoginForm)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateLoginForm(inputs, setErrors)
    if (!isValid) return

    try {
      await login({ username: inputs.username, password: inputs.password }).unwrap()
      successSE()
      push(dashboard)
    } catch (error) {
      errorSE()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mt-2 relative flex flex-col gap-y-3">
      <h1 className="text-2xl text-center text-white mt-5 mb-7 font-bold">Login</h1>
      <div
        className={`flex items-center h-56 w-full rounded-xl px-3 bg-inputbgcolor border ${
          submitted && errors?.username ? 'border-red-500' : 'border-inputbordercolor'
        }`}
      >
        <input
          name="username"
          type="search"
          onChange={handleInput}
          placeholder="Username"
          className="input-box w-full text-lime-400 font-semibold focus:outline-none bg-transparent placeholder:text-inputplaceholdercolor"
        />
      </div>
      <div
        className={`flex items-center h-56 w-full rounded-xl px-3 bg-inputbgcolor border ${
          submitted && errors?.password ? 'border-red-500' : 'border-inputbordercolor'
        }`}
      >
        <input
          onClick={() => setType(true)}
          onKeyDown={() => setType(true)}
          name="password"
          type={type ? 'password' : 'search'}
          onChange={handleInput}
          placeholder="Password"
          className="input-box w-full text-lime-400 font-semibold focus:outline-none bg-transparent placeholder:text-inputplaceholdercolor"
        />
        {isLoading ? (
          <Spinner wAndH="w-5 h-5" />
        ) : (
          <button type="submit" className="text-sm font-bold">
            <FontAwesomeIcon icon={success ? faLockOpen : faLock} className="text-zinc-600 w-5 h-5 hover:text-zinc-500 duration-200" />
          </button>
        )}
      </div>
      {error?.data?.message && <div className="absolute right-0 -bottom-6 text-xs text-red-500 animate-fadeIn">{error?.data?.message}</div>}
    </form>
  )
}

export default LoginForm
