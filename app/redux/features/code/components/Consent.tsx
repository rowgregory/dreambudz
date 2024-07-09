import Typewriter from '@/app/components/common/Typewriter';
import { useAppDispatch } from '@/app/redux/store';
import Link from 'next/link';
import React, { FC } from 'react';
import { resetCodeSuccess } from '../codeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface ConsentProps {
  token: string | null;
  setConsent: any;
  setCode: any;
}

const Consent: FC<ConsentProps> = ({ token, setConsent, setCode }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <Typewriter
        sentence="Are you at least 21 years old?"
        speed={20}
        text="text-sm text-zinc-100 font-bold h-5"
      />
      <div className="flex justify-center w-[200.22px]">
        <Link
          data-testid="thumbs-up"
          href={`/code-validated/${token}/items`}
          className={`duration-200 ml-3 mt-8 text-sm font-bold`}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="fa-solid fa-thumbs-up fa-lg text-zinc-400 w-5 duration-200 hover:text-lime-400"
          />
        </Link>
        <button
          onClick={() => {
            dispatch(resetCodeSuccess());
            setConsent(false);
            setCode('');
          }}
          className={`duration-200 ml-3 mt-8 text-sm font-bold`}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="fa-solid fa-thumbs-up fa-lg text-zinc-400 w-5 duration-200 hover:text-red-400"
          />
        </button>
      </div>
    </div>
  );
};

export default Consent;
