import UIFx from 'uifx';
import {
  RootState,
  persistor,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { useRouter } from 'next/navigation';
import {
  setProgress,
  toggleProgressBar,
} from '../redux/features/progress-bar/progressBarSlice';
import { resetAuth } from '../redux/features/auth/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/public/images';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faSignOut } from '@fortawesome/free-solid-svg-icons';

const PublicHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const auth = useAppSelector((state: RootState) => state.auth);
  const [soundEffect, setSoundEffect] = useState<UIFx | null>(null);

  useEffect(() => {
    const DescendMusicalMallet = '/sound-effects/descend-musical-mallet.mp3';
    setSoundEffect(new UIFx(DescendMusicalMallet));
  }, []);

  const handleLogout = () => {
    dispatch(setProgress(0));
    soundEffect?.play();
    dispatch(setProgress(25));
    persistor.purge();
    dispatch(setProgress(50));
    dispatch(resetAuth());
    dispatch(setProgress(100));

    setTimeout(() => {
      dispatch(toggleProgressBar(false));
      dispatch(setProgress(0));
      navigate.push('/');
    }, 250);
  };

  return (
    <div className="w-full h-20 bg-[#212121] flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-6 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Dream Budz"
          className="object-contain h-20 w-fit"
          loading="lazy"
        />
        <div className="flex items-center">
          {auth?.isAdmin && (
            <Link href="/admin/dashboard">
              <FontAwesomeIcon
                icon={faGaugeHigh}
                className="fa-solid fa-sign-out text-zinc-300 cursor-pointer duration-200 hover:text-zinc-400 mr-4"
              />
            </Link>
          )}
          <FontAwesomeIcon
            onClick={handleLogout}
            icon={faSignOut}
            className="fa-solid fa-sign-out text-zinc-300 cursor-pointer duration-200 hover:text-zinc-400"
          />
        </div>
      </div>
    </div>
  );
};

export default PublicHeader;
