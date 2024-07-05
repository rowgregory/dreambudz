'use client';

import { useRouter } from 'next/navigation';
import Typewriter from '../../components/common/Typewriter';
import {
  setProgress,
  toggleProgressBar,
} from '@/app/redux/features/progress-bar/progressBarSlice';
import {
  useRegisterMutation,
  useVerifyRegisterCodeMutation,
} from '@/app/redux/services/authApi';
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store';
import RegisterForm from '@/app/redux/features/auth/components/RegisterForm';
import useForm from '@/app/utils/hooks/useForm';
import useSoundEffect from '@/app/utils/hooks/useSoundEffect';
import { dashboard } from '@/public/data/paths';
import Lock from '@/app/redux/features/code/components/Lock';
import { FormEvent, useRef, useState } from 'react';
import { authenticatedSE, failSE } from '@/public/data/soundEffectPaths';
import { resetAuthSuccess } from '@/app/redux/features/auth/authSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const inputRef = useRef(null) as any;
  const { inputs, handleInput } = useForm(['username', 'password']);
  const success = useAppSelector((state: RootState) => state.auth.success);
  const [code, setCode] = useState('');
  const soundEffect = useSoundEffect(authenticatedSE);
  const failSoundEffect = useSoundEffect(failSE);

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyRegisterCode] = useVerifyRegisterCodeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.password !== '' && inputs.username !== '') {
      dispatch(toggleProgressBar(true));
      dispatch(setProgress(15));
      await register({ username: inputs.username, password: inputs.password })
        .unwrap()
        .then((data: any) => {
          if (data.accountWasCreated) {
            dispatch(setProgress(100));
            soundEffect?.play();
            navigate.push(dashboard);
            setTimeout(() => {
              dispatch(toggleProgressBar(false));
              dispatch(setProgress(0));
              dispatch(resetAuthSuccess())
            }, 250);
          }
        })
        .catch(() => {
          failSoundEffect?.play();
          dispatch(toggleProgressBar(false));
          dispatch(setProgress(0));
        });
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleProgressBar(true));
    dispatch(setProgress(15));
    await verifyRegisterCode({ code })
      .unwrap()
      .then((data: any) => {
        dispatch(setProgress(75));
        if (data?.codeValidated) {
          dispatch(setProgress(100));
          setTimeout(() => {
            dispatch(setProgress(0));
            dispatch(toggleProgressBar(false));
          }, 100);
        }
      })
      .catch(() => {
        dispatch(setProgress(0));
        dispatch(toggleProgressBar(false));
        failSoundEffect?.play();
        inputRef.current.value = '';
        setCode('');
      });
  };

  return (
    <div className="flex flex-col items-center overflow-hidden pt-40">
      {success ? (
        <div className="flex flex-col">
          <Typewriter
            sentence={success ? 'Register' : 'Enter Code'}
            speed={40}
            text="text-sm text-zinc-100 font-bold h-5"
          />
          <RegisterForm
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <Lock
          inputRef={inputRef}
          setCode={setCode}
          code={code}
          handleVerifyCode={handleVerifyCode}
          isLoading={isLoading}
          success={success}
        />
      )}
    </div>
  );
};

export default Register;
