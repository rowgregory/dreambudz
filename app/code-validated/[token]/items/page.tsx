'use client';

import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import extractAndDecodeJWT from '@/app/utils/extractAndDecodeJWT';
import { useGetProductsQuery } from '@/app/redux/services/productApi';
import { RootState } from '@/app/redux/store';
import Spinner from '@/app/components/common/Spinner';
import Link from 'next/link';
import Image from 'next/image';

const Items = ({ params }: any) => {
  const navigate = useRouter();
  const token = params?.token;
  const { isLoading } = useGetProductsQuery();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    const tokenIsValid = extractAndDecodeJWT(token);

    if (!tokenIsValid) {
      navigate.push('/');
    }
  }, [token, navigate]);

  return (
    <Fragment>
      <div className="max-w-[1400px] mx-auto pt-16">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner fill="fill-lime-500" wAndH="w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 px-3 lg:px-6">
            {products?.map(
              (product: any, i: number) =>
                product.quantity >= 1 && (
                  <Link
                    href={{
                      pathname: `/code-validated/${token}/item`,
                      query: { product: JSON.stringify(product) },
                    }}
                    key={i}
                    className="rounded-lg col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 bg-[#181818]"
                  >
                    <Image
                      src={product.image}
                      alt={`product${i}`}
                      className="bg-zinc-950 w-full h-48 object-contain rounded-tl-lg rounded-tr-lg p-2"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority={true}
                    />
                    <div className="p-4">
                      <p className="text-sm font-semibold mb-2">
                        {product?.productName}
                      </p>
                      <p className="text-sm text-zinc-400 text-ellipsis overflow-hidden">
                        {product?.description?.length > 40
                          ? product?.description?.substring(0, 40) + '...'
                          : product?.description}
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>
        )}
      </div>
      <p className="max-w-[1400px] mx-auto text-sm text-zinc-600 px-3 lg:px-6 mt-48 pb-10">
        This website is intended for demonstration purposes only. All content,
        including but not limited to text, images, and functionalities, is
        simulated and does not represent real products, services, or data. Any
        resemblance to actual names, brands, products, or services is purely
        coincidental.
      </p>
    </Fragment>
  );
};

export default Items;
