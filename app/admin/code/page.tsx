'use client'

import { FormEvent, MouseEvent, useCallback, useRef, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import AdminCommandArea from '@/app/components/AdminCommandArea'
import AdminErrorText from '@/app/components/AdminErrorText'
import useForm from '@/app/hooks/useForm'
import useOutsideDetect from '@/app/utils/useOutsideDetect'
import { useGetCodeQuery, useUpdateCodeMutation } from '@/app/redux/services/codeApi'
import { resetCodeError } from '@/app/redux/features/codeSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import validateAdminUpdateCodeForm from '@/app/validations/validateAdminUpdateCodeForm'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons'

const Code = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [updateCode, { isLoading: loadingUpdateCode }] = useUpdateCodeMutation()
  const { isLoading: loadingGetCode, error: errorGetCode, data } = useGetCodeQuery()
  const { error: errorUpdateCode } = useAppSelector((state: RootState) => state.code)
  const { play: successSE } = useSoundEffect('/sound-effects/level-up.mp3', true)
  const { play: errorSE } = useSoundEffect('/sound-effects/error-2.mp3', true)
  const { inputs, errors, handleInput, setInputs, setErrors } = useForm({ code: '' }, validateAdminUpdateCodeForm, data?.code)
  const [reveal, setReveal] = useState(false)

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validateAdminUpdateCodeForm(inputs, setErrors)
    if (!isValid) return

    try {
      await updateCode(inputs).unwrap()
      setReveal(false)
      successSE()
    } catch (error) {
      errorSE()
    }
  }

  const handleClose = useCallback(() => {
    dispatch(resetCodeError())
    setReveal(false)
    if (inputs.code === '') setInputs({ code: data?.code?.code })
    setErrors({})
  }, [dispatch, data, inputs, setInputs, setErrors])

  useOutsideDetect(containerRef, handleClose)

  return (
    <>
      <AdminCommandArea type="CODE" />
      {loadingGetCode ? (
        <div className="overflow-hidden">
          <div className={`bg-transparent fixed w-full inset-0 flex items-center justify-center z-[70]`}>
            <Spinner wAndH="w-10 h-10" fill="fill-lime-400" />
          </div>
        </div>
      ) : errorGetCode?.data?.message ? (
        <AdminErrorText error={errorGetCode?.data?.message} />
      ) : (
        <div
          ref={containerRef}
          className="max-w-sm bg-gradient-to-r from-indigo-600 to-indigo-400 animate-fadeIn aspect-video w-full flex flex-col items-center justify-center text-center cursor-pointer px-4 relative overflow-hidden group"
        >
          <AwesomeIcon
            icon={faCodeCompare}
            className="text-white/10 text-[200px] absolute -right-16 -top-0 group-hover:-rotate-12 duration-300 transform origin-bottom"
          />
          {reveal ? (
            <form onSubmit={handleUpdate} className="flex flex-col">
              <input
                ref={inputRef}
                autoComplete="off"
                type="text"
                name="code"
                onChange={handleInput}
                value={(inputs.code as string) || ''}
                className="admin-code-page bg-transparent text-center text-4xl text-white font-bold focus:outline-none border-none w-full"
              />
              {loadingUpdateCode ? (
                <div className="absolute bottom-2 transform -translate-x-1/2 left-1/2">
                  <Spinner wAndH="w-5 h-5" fill="fill-white" />
                </div>
              ) : (
                <button type="submit" className="text-white font-bold absolute bottom-2 transform -translate-x-1/2 left-1/2">
                  Update
                </button>
              )}
            </form>
          ) : (
            <p
              onClick={(e: MouseEvent<HTMLParagraphElement>) => {
                e.stopPropagation()
                setReveal(true)
                setTimeout(() => inputRef.current?.focus(), 0)
              }}
              className="text-4xl text-white font-bold"
            >
              {inputs.code}
            </p>
          )}
          {errorUpdateCode ||
            (errors.code && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                <AdminErrorText error={errorUpdateCode || errors.code} />
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Code
