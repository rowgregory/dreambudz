'use client';

import { useMemo } from 'react';
import { useAppDispatch } from '@/app/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import useProductForm from '@/app/redux/features/product/hooks/useProductForm';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/app/redux/services/productApi';
import {
  setProgress,
  toggleProgressBar,
} from '@/app/redux/features/progress-bar/progressBarSlice';
import { uploadFileToFirebase } from '@/app/utils/firebase';
import Link from 'next/link';
import ProductEditCreateForm from '@/app/redux/features/product/components/ProductEditCreateForm';
import useSoundEffect from '@/app/utils/hooks/useSoundEffect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ProductEditCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const productString = searchParams?.get('product') as any;
  const product = useMemo(() => {
    return productString ? JSON.parse(productString) : null;
  }, [productString]);
  const isEditMode = searchParams?.get('isEditMode') === 'true';
  const { handleInput, inputs, setInputs } = useProductForm(product);
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const soundEffect = useSoundEffect('/sound-effects/dream-1.mp3');
  const errorSoundEffect = useSoundEffect('/sound-effects/error.mp3');

  const handleErrors = (err: any) => {
    errorSoundEffect?.play()
    dispatch(setProgress(0));
    dispatch(toggleProgressBar(false));
    console.error(err);
  };

  const handleSuccess = () => {
    dispatch(setProgress(85));
    soundEffect?.play();
    dispatch(setProgress(100));
    setTimeout(() => {
      dispatch(setProgress(0));
      dispatch(toggleProgressBar(false));
      navigate.push('/admin/products');
    }, 250);
  };

  const handleProductUpdate = async () => {
    dispatch(setProgress(15));
    await updateProduct({ ...inputs, id: product.id })
      .unwrap()
      .then(handleSuccess)
      .catch(handleErrors);
  };

  const handleProductCreate = async () => {
    dispatch(setProgress(15));
    await createProduct(inputs)
      .unwrap()
      .then(handleSuccess)
      .catch(handleErrors);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(toggleProgressBar(true));
    dispatch(setProgress(5));
    if (Boolean(isEditMode)) {
      handleProductUpdate();
    } else {
      handleProductCreate();
    }
  };

  const editPhotoHandler = async (e: any) => {
    const imgData: any = await uploadFileToFirebase(e.target.files[0]);
    setInputs((prev: any) => ({
      ...prev,
      image: imgData?.url,
      fileName: imgData?.fileName
    }));
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-y-8 py-20 w-full lg:max-w-screen-md mx-auto px-3 md:px-6">
      <Link
        href="/admin/products"
        className="w-fit border border-zinc-900 bg-zinc-900 px-3.5 py-1.5 flex items-center hover:no-underline group hover:bg-zinc-800 duration-300"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="fa-xs mr-2" />
        <p className="font-Matter-Regular text-sm">Back to products</p>
      </Link>
      <ProductEditCreateForm
        editPhotoHandler={editPhotoHandler}
        inputs={inputs}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isEditMode={isEditMode}
        loadingCreate={loadingCreate}
        loadingUpdate={loadingUpdate}
      />
    </div>
  );
};

export default ProductEditCreate;
