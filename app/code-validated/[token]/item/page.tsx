'use client'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const Item = ({ params }: any) => {
  const searchParams = useSearchParams();
  const productString = searchParams?.get('product') as any;
  const product = useMemo(() => {
    return productString ? JSON.parse(productString) : null;
  }, [productString]);

  const token = params?.token;

  return (
    <div className="flex flex-col mt-16 items-center w-full min-h-screen bg-zinc-950 px-3 lg:px-0">
      <div className="flex flex-col">
        <Link
          href={`/code-validated/${token}/items`}
          className="w-fit border border-zinc-900 bg-zinc-900 rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline group hover:bg-zinc-800 duration-300 mb-5"
        >
          <FontAwesomeIcon icon={faChevronLeft} className='fa-xs mr-2' />
          <p className="font-Matter-Regular text-sm mt-0.5">Back to products</p>
        </Link>
        <div className="max-w-screen-lg grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <Image
              className="object-contain aspect-square w-full"
              src={product?.image}
              alt={product?.productName}
              width="0"
              height="0"
              sizes="100vw"
              priority={true}
            />
          </div>
          <div className="col-span-12 md:col-span-5 p-6">
            <h2 className="text-2xl font-bold mb-2">{product?.productName}</h2>
            <p className="text-gray-700">{product?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
