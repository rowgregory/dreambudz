'use client';

import { useRouter } from 'next/navigation';
import Typewriter from '../../components/common/Typewriter';
import {
  setProgress,
  toggleProgressBar,
} from '@/app/redux/features/progress-bar/progressBarSlice';
import { useRegisterMutation } from '@/app/redux/services/authApi';
import { useAppDispatch } from '@/app/redux/store';
import RegisterForm from '@/app/redux/features/auth/components/RegisterForm';
import useForm from '@/app/utils/hooks/useForm';
import useSoundEffect from '@/app/utils/hooks/useSoundEffect';
import { dashboard } from '@/public/data/paths';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const { inputs, handleInput } = useForm(['username', 'password']);
  const soundEffect = useSoundEffect('/sound-effects/gain-access.mp3');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="flex flex-col">
        <Typewriter
          sentence="Register"
          speed={40}
          text="text-sm text-zinc-100 font-bold h-5"
        />
        <RegisterForm
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Register;
