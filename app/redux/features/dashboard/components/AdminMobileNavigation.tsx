import { persistor, useAppDispatch } from '../../../store';
import { resetAuthSuccess } from '../../auth/authSlice';
import {
  setProgress,
  toggleProgressBar,
} from '../../progress-bar/progressBarSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/public/images';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useSoundEffect from '@/app/utils/hooks/useSoundEffect';

const AdminMobileNavigation = ({ toggleMobileMenu, close }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const soundEffect = useSoundEffect('/sound-effects/descend-musical-mallet.mp3')

  const handleLogout = () => {
    close()
    dispatch(toggleProgressBar(true));
    dispatch(setProgress(0));
    soundEffect?.play();
    persistor.purge();
    dispatch(setProgress(50));
    dispatch(resetAuthSuccess());
    dispatch(setProgress(100));
    navigate.push('/auth/login');

    setTimeout(() => {
      dispatch(toggleProgressBar(false));
      dispatch(setProgress(0));
    }, 200)
  };

  return (
    <div
      className={`${toggleMobileMenu
        ? 'w-screen left-0 overflow-hidden'
        : 'left-[-100vw] w-none'
        } fixed duration-200 min-h-screen bg-zinc-950 top-0 left-0 flex flex-col items-center justify-center gap-5 z-[60]`}
    >
      <FontAwesomeIcon
        onClick={close}
        icon={faTimes}
        className="text-lime-400 top-4 right-4 absolute cursor-pointer"
      />
      <Image
        onClick={close}
        src={Logo}
        className="w-40 hover:text-lime-400 duration-200 cursor-pointer"
        alt="Dream Budz"
      />
      <Link
        onClick={close}
        className="hover:text-lime-400 duration-200"
        href="/admin/dashboard"
      >
        Dashboard
      </Link>
      <Link
        onClick={close}
        className="hover:text-lime-400 duration-200"
        href="/admin/products"
      >
        Products
      </Link>
      <Link
        onClick={close}
        className="hover:text-lime-400 duration-200"
        href="/admin/code"
      >
        Code
      </Link>
      <Link
        onClick={handleLogout}
        className="hover:text-lime-400 duration-200"
        href="/auth/login"
      >
        Logout
      </Link>
    </div>
  );
};

export default AdminMobileNavigation;
