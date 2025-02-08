'use client'

import { useRef } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import { setCloseCreateProductModal } from '../redux/features/productSlice'
import { useCreateProductMutation } from '../redux/services/productApi'
import AdminModal from '../components/common/AdminModal'
import AdminModalClostBtn from '../components/common/AdminModalClostBtn'
import AdminProductForm from '../forms/AdminProductForm'
import validateAdminProductForm from '../validations/validateAdminProductForm'
import { ADMIN_PRODUCT_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'

const AdminProductCreateModal = () => {
  const inputRef = useRef(null) as any
  const dispatch = useAppDispatch()
  const [createProduct, { isLoading, error }] = useCreateProductMutation()
  const { openModalCreateProduct } = useAppSelector((state: RootState) => state.product)
  const {
    inputs,
    errors,
    handleInput,
    setInputs,
    setErrors,
    submitted,
    setSubmitted,
    handleDrop,
    handleFileChange,
    handleToggle,
    handleUploadProgress,
    uploadProgress
  } = useForm(ADMIN_PRODUCT_INITIAL_FIELDS, validateAdminProductForm)

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setCloseCreateProductModal())
    setSubmitted(false)
  }

  const handleSubmitCreateProduct = async (e: any) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateAdminProductForm(inputs, setErrors)
    if (!isValid) return

    const url = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')

    const { file, id, ...rest } = inputs

    await createProduct({ ...rest, image: url, fileName: inputs.file.name }).unwrap()
    reset()
  }

  return (
    <AdminModal show={openModalCreateProduct}>
      <AdminModalClostBtn reset={reset} />
      <AdminProductForm
        handleSubmit={handleSubmitCreateProduct}
        isUpdating={false}
        handleDrop={handleDrop}
        inputRef={inputRef}
        inputs={inputs}
        handleFileChange={handleFileChange}
        errors={errors}
        submitted={submitted}
        handleInput={handleInput}
        reset={reset}
        loading={isLoading}
        error={error?.data?.message}
        handleToggle={handleToggle}
        uploadProgress={uploadProgress}
      />
    </AdminModal>
  )
}

export default AdminProductCreateModal
