'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  setProgress,
  toggleProgressBar,
} from './redux/features/progress-bar/progressBarSlice';
import { RootState, useAppDispatch, useAppSelector } from './redux/store';
import { resetCodeSuccess } from './redux/features/code/codeSlice';
import { useVerifyCodeMutation } from './redux/services/codeApi';
import Consent from './redux/features/code/components/Consent';
import Lock from './redux/features/code/components/Lock';
import useSoundEffect from './utils/hooks/useSoundEffect';

const LockScreen = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null) as any;
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const token = useAppSelector((state: RootState) => state.code.token);
  const success = useAppSelector((state: RootState) => state.code.success);
  const failSoundEffect = useSoundEffect("/sound-effects/descend-musical-mallet.mp3")
  const successSoundEffect = useSoundEffect("/sound-effects/gain-access.mp3")

  useEffect(() => {
    inputRef?.current?.focus();
    dispatch(resetCodeSuccess());
  }, [dispatch]);

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(toggleProgressBar(true));
    dispatch(setProgress(15));
    await verifyCode({ code })
      .unwrap()
      .then((data: any) => {
        dispatch(setProgress(75));
        if (data?.codeIsValid) {
          successSoundEffect?.play();
          dispatch(setProgress(100));

          setTimeout(() => {
            setConsent(true);
            dispatch(setProgress(0));
            dispatch(toggleProgressBar(false));
          }, 250);
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
    <div className="flex items-center justify-center overflow-hidden pt-40">
      {consent ? (
        <Consent token={token} setConsent={setConsent} setCode={setCode} />
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

export default LockScreen;
