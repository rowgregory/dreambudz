import Spinner from '@/app/components/common/Spinner';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { FormControl, Switch } from '@chakra-ui/react';

const ProductEditCreateForm = ({
  editPhotoHandler,
  inputs,
  handleInput,
  handleSubmit,
  isEditMode,
  loadingCreate,
  loadingUpdate,
}: any) => {
  return (
    <form className="flex flex-col gap-4 border-[1px] border-zinc-800 py-12 px-3 sm:px-8 bg-[#141418]">
      <div className="grid grid-cols-12 gap-y-6">
        <div className="col-span-5">Publish</div>
        <div className="col-start-12 col-span-7 flex self-end justify-end">
          <FormControl display="flex" alignItems="center">
            <Switch id="publish" onChange={handleInput} name='publish' isChecked={inputs.publish || false} />
          </FormControl>
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-800 my-12">
      </div>
      <div className="grid grid-cols-12 gap-y-6">
        <div className="col-span-12 md:col-span-5">
          Upload an image of your product
        </div>
        <div className="col-span-12 md:col-span-7 flex justify-center p-4 mx-auto w-full bg-zinc-950 cursor-pointer">
          <input
            id="image-file"
            type="file"
            onChange={editPhotoHandler}
            className="hidden"
            name="image"
          />
          <label htmlFor="image-file" className="rounded-md cursor-pointer">
            {inputs.image ? (
              <Image
                src={inputs.image}
                alt="Dream Budz"
                className="object-contain aspect-square w-full md:w-60 bg-zinc-950 rounded-md"
                width="0"
                height="0"
                sizes="100vw"
                priority={true}
              />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-800 mb-1">
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="fa-lg flex justify-center items-center text-gray-200"
                  />
                </div>
                <p className="text-sm underline text-gray-500">
                  Click to add photo
                </p>
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-800 my-12"></div>
      <div className="grid grid-cols-12 gap-y-6">
        <div className="col-span-12 md:col-span-5">Product details</div>
        <div className="col-span-12 md:col-span-7 grid gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xs text-zinc-300 mb-1">
              Product name
            </label>
            <input
              type="text"
              name="productName"
              onChange={handleInput}
              value={inputs.productName || ''}
              className="border-zinc-700 border-[1px] px-3 text-xs text-white bg-transparent h-10 focus:outline-none input-box"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-xs text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={inputs.description || ''}
              onChange={handleInput}
              aria-label="Enter description"
              className="border-zinc-700 border-[1px] p-3 text-white bg-transparent focus:outline-none text-xs input-box"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-800 my-12"></div>
      <button
        onClick={handleSubmit}
        className="mt-5 cursor-pointer text-sm bg-lime-600 font-bold text-white w-full md:w-fit px-7 py-2 hover:bg-lime-500 duration-200 flex self-end items-center justify-center"
      >
        {(loadingCreate || loadingUpdate) && (
          <span className="mr-2">
            <Spinner fill="fill-white" />
          </span>
        )}
        {isEditMode
          ? `Updat${loadingUpdate ? 'ing...' : 'e'}`
          : `Creat${loadingCreate ? 'ing...' : 'e'}`}
      </button>
    </form>
  );
};

export default ProductEditCreateForm;
