import { useRef } from 'react'

const Switch = ({ enabled, onChange }: { enabled: any; onChange: any }) => {
  const inputRef = useRef(null) as any
  return (
    <>
      <button
        type="button"
        onClick={(e: any) => {
          e.preventDefault()
          inputRef?.current?.click()
        }}
        className={`relative w-24 h-12 flex items-center rounded-full transition-colors duration-300 bg-zinc-700`}
      >
        <span
          className={`absolute left-1 w-8 h-8 rounded-full shadow-md transition-all duration-300 ${
            enabled ? 'translate-x-12 bg-lime-500' : 'translate-x-0 bg-red-500'
          }`}
        />
      </button>
      <input name="publish" ref={inputRef} type="checkbox" value={enabled} onChange={onChange} className="hidden" />
    </>
  )
}

export default Switch
