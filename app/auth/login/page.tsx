'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/app/redux/services/authApi';
import { useAppDispatch } from '@/app/redux/store';
import {
  setProgress,
  toggleProgressBar,
} from '@/app/redux/features/progress-bar/progressBarSlice';
import Typewriter from '../../components/common/Typewriter';
import LoginForm from '@/app/redux/features/auth/components/LoginForm';
import useSoundEffect from '@/app/utils/hooks/useSoundEffect';
import useForm from '@/app/utils/hooks/useForm';
import { dashboard } from '@/public/data/paths';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const soundEffect = useSoundEffect('/sound-effects/gain-access.mp3');
  const { inputs, handleInput } = useForm(['username', 'password']);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.password !== '' && inputs.username !== '') {
      dispatch(toggleProgressBar(true));
      dispatch(setProgress(25));
      await login({ username: inputs.username, password: inputs.password })
        .unwrap()
        .then((data: any) => {
          if (data.isAuthenticated) {
            dispatch(setProgress(100));
            soundEffect?.play();
            navigate.push(dashboard);
            setTimeout(() => {
              dispatch(toggleProgressBar(false));
              dispatch(setProgress(0));
            }, 250);
          }
        })
        .catch(() => {
          dispatch(toggleProgressBar(false));
          dispatch(setProgress(0));
        });
    }
  };

  return (
    <div className="flex flex-col items-center overflow-hidden pt-40">
      <div className="flex flex-col px-7">
        <Typewriter
          sentence="Login"
          speed={40}
          text="text-sm text-zinc-100 font-bold h-5"
        />
        <LoginForm
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Login;
