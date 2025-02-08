'use client'

import { useRef } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import { setCloseUpdateProductModal } from '../redux/features/productSlice'
import { useUpdateProductMutation } from '../redux/services/productApi'
import AdminModal from '../components/common/AdminModal'
import AdminModalClostBtn from '../components/common/AdminModalClostBtn'
import AdminProductForm from '../forms/AdminProductForm'
import validateAdminProductForm from '../validations/validateAdminProductForm'
import { ADMIN_PRODUCT_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'

const AdminProductUpdateModal = () => {
  const inputRef = useRef(null) as any
  const dispatch = useAppDispatch()
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation()
  const { openModalUpdateProduct, product } = useAppSelector((state: RootState) => state.product)
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
    handleUploadProgress
  } = useForm(ADMIN_PRODUCT_INITIAL_FIELDS, validateAdminProductForm, product)

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setCloseUpdateProductModal())
    setSubmitted(false)
  }

  const handleSubmitUpdateProduct = async (e: any) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateAdminProductForm(inputs, setErrors)
    if (!isValid) return

    let image
    if (inputs.file) {
      image = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
    }

    const { file, ...rest } = inputs

    await updateProduct({ ...rest, image: image || inputs.image, fileName: inputs?.file?.name || inputs.fileName }).unwrap()
    reset()
  }

  return (
    <AdminModal show={openModalUpdateProduct}>
      <AdminModalClostBtn reset={reset} />
      <AdminProductForm
        handleSubmit={handleSubmitUpdateProduct}
        isUpdating={true}
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
      />
    </AdminModal>
  )
}

export default AdminProductUpdateModal
