import React, { FormEvent, useRef } from 'react'
import useSoundEffect from '../hooks/useSoundEffect'
import useForm from '../hooks/useForm'
import { useVerifyRegisterCodeMutation } from '../redux/services/authApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import validateRegisterVerifyCodeForm from '../validations/validateRegisterVerifyCodeForm'
import { REGISTER_VERIFY_CODE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import Spinner from '@/app/components/common/Spinner'
import { authenticatedSE, failSE } from '@/public/data/soundEffectPaths'

const VerifyRegisterCodeForm = () => {
  const { inputs, handleInput, setInputs, setErrors } = useForm(REGISTER_VERIFY_CODE_INITIAL_FIELDS, validateRegisterVerifyCodeForm)
  const [verifyRegisterCode, { isLoading, error }] = useVerifyRegisterCodeMutation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { play: errorSE } = useSoundEffect(failSE, true)
  const { play: successSE } = useSoundEffect(authenticatedSE, true)

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validateRegisterVerifyCodeForm(inputs, setErrors)
    if (!isValid) return

    try {
      await verifyRegisterCode({ code: inputs.code }).unwrap()
      successSE()
    } catch (error) {
      errorSE()
      setInputs({})
    }
  }

  return (
    <form onSubmit={handleVerifyCode} className="w-full max-w-sm mt-2 relative">
      <h1 className="text-2xl text-center text-white mt-5 mb-7 font-bold">Enter Code</h1>
      <div className="flex items-center h-56 w-full rounded-xl px-3 bg-inputbgcolor border border-inputbordercolor">
        <input
          ref={inputRef}
          name="code"
          type="text"
          onChange={handleInput}
          value={(inputs.code as string) || ''}
          className="input-box w-full text-lime-400 font-semibold focus:outline-none bg-transparent placeholder:text-inputplaceholdercolor"
          placeholder="Code"
        />
        {isLoading ? (
          <Spinner fill="fill-lime-400" wAndH="w-5 h-5" />
        ) : (
          <button
            type="submit"
            disabled={inputs.code === ''}
            className={`text-sm font-bold ${inputs.code === '' ? '' : 'group cursor-pointer'}`}
          >
            <FontAwesomeIcon icon={faArrowRightLong} className={`text-zinc-600 w-5 h-5 group-hover:text-zinc-500 duration-200`} />
          </button>
        )}
      </div>
      {error?.data?.message && <div className="absolute right-0 -bottom-6 text-xs text-red-500 animate-fadeIn">{error?.data?.message}</div>}
    </form>
  )
}

export default VerifyRegisterCodeForm
