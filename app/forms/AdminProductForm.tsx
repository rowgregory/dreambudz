import { FC } from 'react'
import { AdminProductFormProps } from '../types/admin.types'
import AdminFormFooter from '../components/AdminFormFooter'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { uploadIcon } from '../icons'
import Switch from '../components/common/Switch'

const AdminProductForm: FC<AdminProductFormProps> = ({
  handleSubmit,
  isUpdating,
  handleDrop,
  inputRef,
  inputs,
  handleFileChange,
  errors,
  submitted,
  handleInput,
  reset,
  loading,
  error,
  handleToggle,
  uploadProgress
}) => {
  return (
    <form onSubmit={handleSubmit} className="h-dvh lg:h-auto relative">
      <div className="py-12 max-w-md mx-auto flex flex-col items-center justify-center lg:h-full w-full">
        <Picture src="/images/mj-1.png" priority={false} className="w-20 h-20 object-contain" />
        <h1 className="font-semibold text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} Product</h1>
        <div className="h-[1px] w-full bg-zinc-800 my-5"></div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef?.current?.click()}
          className="w-44 max-h-44 h-auto border-2 border-dotted border-[#7e7e7e] aspect-video rounded-md flex flex-col items-center justify-center p-4 cursor-pointer relative"
        >
          {inputs?.image ? (
            <Picture src={inputs?.image} alt="Uploaded" className="w-full h-full object-contain" priority={true} />
          ) : (
            <>
              <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#6a696f]" />
              <p className="text-xs text-[#6a696f] text-center">Drag & Drop or Click</p>
            </>
          )}
        </div>
        <input name="image" ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        {submitted && errors?.image && <span className={`text-[11px] mt-0.5 text-red-500 whitespace-nowrap`}>{errors?.image}</span>}
        <div className="h-[1px] w-full bg-zinc-800 my-5"></div>
        <div className="flex flex-col w-full my-7">
          <input
            name="productName"
            onChange={handleInput}
            className={`p-4 bg-inputbgcolor text-white border-1 border-inputbordercolor md:rounded-xl placeholder:text-inputplaceholdercolor focus:outline-none w-full`}
            placeholder="Product Name"
            aria-label="Product Name"
            value={inputs.productName || ''}
          />
          {submitted && errors?.productName && (
            <span className={`text-[11px] mt-0.5 text-red-500 whitespace-nowrap`}>{errors?.productName}</span>
          )}
        </div>
        <div className="flex flex-col w-full mb-7">
          <textarea
            id="description"
            name="description"
            rows={5}
            value={inputs.description || ''}
            onChange={handleInput}
            aria-label="Enter description"
            placeholder="Description"
            className={`p-4 bg-inputbgcolor text-white border-1 border-inputbordercolor md:rounded-xl placeholder:text-inputplaceholdercolor focus:outline-none w-full`}
          ></textarea>
          {submitted && errors?.description && (
            <span className={`text-[11px] mt-0.5 text-red-500 font-medium whitespace-nowrap`}>{errors?.description}</span>
          )}
        </div>
        <Switch enabled={(inputs.publish as boolean) || false} onChange={handleToggle} />
      </div>
      {error && <div className="text-sm text-red-500 absolute right-6 bottom-24">{error}</div>}
      {uploadProgress > 0 && uploadProgress < 100 && <div className="absolute right-6 bottom-24 text-white text-sm">{uploadProgress}</div>}
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Product" loading={loading} />
    </form>
  )
}

export default AdminProductForm
