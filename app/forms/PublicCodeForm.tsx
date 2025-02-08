import React, { FC, FormEvent, useRef } from 'react'
import { useVerifyVisitorCodeMutation } from '../redux/services/authApi'
import { PUBLIC_VERIFY_CODE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import useForm from '../hooks/useForm'
import validatePublicVerifyCodeForm from '../validations/validatePublicVerifyCodeForm'
import useSoundEffect from '../hooks/useSoundEffect'
import Spinner from '../components/common/Spinner'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

const PublicCodeForm: FC<{ setConsent: (consent: boolean) => void }> = ({ setConsent }) => {
  const inputRef = useRef(null) as any
  const [verifyVisitorCode, { isLoading, error }] = useVerifyVisitorCodeMutation()
  const { inputs, handleInput, setInputs } = useForm(PUBLIC_VERIFY_CODE_INITIAL_FIELDS, validatePublicVerifyCodeForm)
  const { play: successSE } = useSoundEffect('/sound-effects/ascend-musical-mallet.mp3', true)
  const { play: errorSE } = useSoundEffect('/sound-effects/descend-musical-mallet.mp3', true)

  const handleVerifyVisitorCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await verifyVisitorCode({ code: inputs.code }).unwrap()
      successSE()
      setConsent(true)
    } catch (error) {
      errorSE()
      inputRef.current.value = ''
      setInputs({})
    }
  }

  return (
    <form onSubmit={handleVerifyVisitorCode} className="w-full max-w-sm mt-2 relative flex flex-col gap-y-3">
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
          <Spinner />
        ) : (
          <button
            type="submit"
            disabled={inputs.code === ''}
            className={`text-sm font-bold ${inputs.code === '' ? '' : 'group cursor-pointer'}`}
          >
            <AwesomeIcon icon={faArrowRightLong} className={`text-zinc-600 w-5 h-5 group-hover:text-zinc-500 duration-200`} />
          </button>
        )}
      </div>
      {error?.data?.message && <div className="absolute right-0 -bottom-6 text-xs text-red-500 animate-fadeIn">{error?.data?.message}</div>}
    </form>
  )
}

export default PublicCodeForm
